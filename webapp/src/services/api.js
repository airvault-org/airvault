import axios from 'axios'
import store from './../store'

class Api {

  _client;
  _authenticated;

  constructor() {
    const apiHost = process.env.VUE_APP_API_HOST || 'localhost:3000'
    this._client = axios.create({ baseURL: apiHost })
  }

  async getInstance() {
    const authenticated = JSON.parse(localStorage.getItem('authenticated')) || null;
    if (authenticated) {
      if (Date.now() > authenticated.expires_at) {
        await this.refreshToken()
      }
      this._client.defaults.headers.common['Authorization'] = `${authenticated.token_type} ${authenticated.access_token}`
    } else {
      delete this._client.defaults.headers.common['Authorization']
    }

    return this._client
  }

  async _fetchAndSetAuthenticated(params, config) {
    const response = await this._client.post('/token', params, config)

    if (response.data.access_token) {
      this._authenticated = Object.assign({}, response.data)

      const expirationDate = new Date()
      expirationDate.setTime(Date.now() + response.data.expires_in * 1000)
      this._authenticated.expires_at = expirationDate.getTime()

      localStorage.setItem('authenticated', JSON.stringify(this._authenticated))
      await store.dispatch('authenticateUser', this._authenticated)

      return this._authenticated
    }
  }

  async authenticate(credentials) {
    try {
      const params = new URLSearchParams()
      params.append('username', credentials.username)
      params.append('password', credentials.password)
      params.append('grant_type', 'password')
      params.append('client_id', 'airvault')

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      return this._fetchAndSetAuthenticated(params, config)
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

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      return this._fetchAndSetAuthenticated(params, config)
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
