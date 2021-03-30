# Airvault

[![Netlify Status](https://api.netlify.com/api/v1/badges/46769615-db6f-4924-9c08-00f6d9631879/deploy-status)](https://app.netlify.com/sites/airvault-webapp/deploys)


## Presentation

Airvault aims to be a simple, secure and collaborative password manager.


## Architecture

The project is composed of 3 components:
- 1 database (PostgreSQL recommended)
- 1 API/back-end (Node.js/Fastify/Sequelize)
- 1 web application (Vue/Vuex)

## Installation

Prerequisites:
- Git

First and foremost, you must fetch the source code. We recommend cloning the repository: 

```shell
git clone https://github.com/airvault-org/airvault.git
```

Then move to the folder: 

```shell
cd airvault
```

### Docker (and Docker Compose)

Prerequisites:
- Docker
- Docker Compose

The easiest and quickest way to run the application is by executing Docker Compose:

```shell
docker-compose up -d
```

It will instance 4 containers: 
- `airvault_adminer`
- `airvault_db`
- `airvault_api`
- `airvault_webapp`

It will also instance 1 network:
- `airvault_default`

> ⚠️ Do not forget to adapt the default environment variables in the docker-compose file!

If everything is ok, you should be able to visit http://localhost:8080 and login (default `admin@example.net`/`admin123`) to the web application.

### Manual installation

Prerequisites:
- Node
- npm

You can set up the whole application manually.

**1/** Ensure to have a running database instance (we recommend PostgreSQL)

> 💡 You can use the `db` service contained in the `docker-compose.yml` file by executing `docker-compose up -d db`.

**2/** Generate the API Dotenv file useful for managing and defining environment variables

```shell
npm run configure
```

**3/** Run the API

```shell
npm run start:api
```

**4/** Run the web application

```shell
npm run start:webapp
```

> ⚠️ We recommend to not use the Vue server in production, but to expose the web application resource files through a proxy server such as Nginx, Apache or HAProxy.

**5/** Et voilà !

If everything is ok, you should be able to visit http://localhost:8080 and login (default `admin@example.net`/`admin123`) to the web application.


## Development

Prerequisites:
- Git (2.28.0)
- Docker (v20.10.0) & Docker Compose (v1.27.4)
- Node (v14.15.1) & npm (v6.14.8)

### Installation

Follow the "Manual installation" section above to configure your local environment.


## Licence

Copyright 2021 Airvault team & project

Licensed under the AGPLv3: https://opensource.org/licenses/agpl-3.0


