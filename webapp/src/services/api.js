import axios from 'axios'
import store from './../store'
import httpEncryption from '../services/Aes256GcmEncryption'

class Api {

  _apiHost;
  _client;
  _authenticated;

  constructor() {
    const that = this
    this._apiHost = process.env.VUE_APP_API_HOST || 'http://localhost:3000'
    this._authenticated = JSON.parse(localStorage.getItem('authenticated')) || null
    this._client = axios.create({
      baseURL: this._apiHost,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      transformRequest: [function(payload) {
        if (payload && that.authenticated) {
          let data
          if (process.env.VUE_APP_HTTP_ENCRYPTION_ENABLED === "true") {
            const key = that.authenticated.access_token.substring(0,6)
             data = httpEncryption.encrypt(payload, key)
          } else {
            data = payload
          }
          return JSON.stringify({ data })
        }
        return JSON.stringify(payload)
      }],
      transformResponse: [function(payload) {
        if (that.authenticated && payload) {
          const body = JSON.parse(payload)
          let data
          if (process.env.VUE_APP_HTTP_ENCRYPTION_ENABLED === "true") {
            const key = that.authenticated.access_token.substring(0,6)
            data = httpEncryption.decrypt(body.data, key)
          } else {
            data = body
          }

          return data
        }
        return payload
      }],
    })

    this._client.interceptors.request.use(request => {
      console.log('Starting Request', JSON.stringify(request, null, 2))
      return request
    })

    this._client.interceptors.response.use(response => {
      console.log('Response:', JSON.stringify(response, null, 2))
      return response
    })
  }

  async getInstance() {
    if (this._authenticated) {
      if (Date.now() > this._authenticated.expires_at) {
        await this.refreshToken()
      }
      this._client.defaults.headers.common['Authorization'] = `${this._authenticated.token_type} ${this._authenticated.access_token}`
    } else {
      delete this._client.defaults.headers.common['Authorization']
    }

    return this._client
  }

  get authenticated() {
    return this._authenticated
  }

  async _fetchAndSetAuthenticated(params) {
    const url = `${this._apiHost}/token`
    const response = await fetch(url, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })

    const payload = await response.json()

    if (payload.access_token) {
      this._authenticated = Object.assign({}, payload)

      const expirationDate = new Date()
      expirationDate.setTime(Date.now() + payload.expires_in * 1000)
      this._authenticated.expires_at = expirationDate.getTime()

      localStorage.setItem('authenticated', JSON.stringify(this._authenticated))
      await store.dispatch('authenticateUser', this._authenticated)

      return this._authenticated
    }
  }

  async register(params) {
    try {
      return this._client.post('/v1/accounts', params, {
        transformRequest: [(payload) => JSON.stringify(payload)],
      })
    } catch (e) {
      console.error(e)
    }
  }

  async authenticate(credentials) {
    try {
      const params = new URLSearchParams()
      params.append('username', credentials.username)
      params.append('password', credentials.password)
      params.append('grant_type', 'password')
      params.append('client_id', 'airvault')
      return this._fetchAndSetAuthenticated(params)
    } catch (e) {
      console.error(e)
    }
  }

  async refreshToken() {
    try {
      const params = new URLSearchParams()
      params.append('refresh_token', this._authenticated.refresh_token)
      params.append('grant_type', 'refresh_token')
      params.append('client_id', 'airvault')
      return this._fetchAndSetAuthenticated(params)
    } catch (e) {
      console.error(e)
    }
  }

  async invalidate() {
    localStorage.removeItem('authenticated');
    await store.dispatch('invalidateAuthenticatedUser')
  }
}

export default new Api()
