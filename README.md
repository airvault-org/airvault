# password-manager

A simple, secure and collaborative password manager.

- [API](https://passwords-api-production.herokuapp.com/)
- [Webapp](https://passwords-webapp-production.herokuapp.com/)

## Development

### Workspace installation

#### Prerequisites

Required programs (with recommanded versions):
- Git (2.28.0)
- Docker (v20.10.0) & Docker Compose (v1.27.4)
- Node (v14.15.1) & npm (v6.14.8)

#### Steps

**1/** Fetch the project sources

```shell script
git clone git@github.com:jbuget/password-manager.git
cd password-manager
```

**2/** Configure and install the building blocks

```shell script
npm run configure
```

**3/** Check all the services are up and running

- API [[3000](http://localhost:3000)]
- Database / PostgreSQL [[5432](pg://admin:admin@db/password-manager)]
- DB administration tool / Adminer [[8080](http://localhost:8080)]
