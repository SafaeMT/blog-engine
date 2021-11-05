# blog-engine &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

> A build to learn project

## Developing

### Developed With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Material-UI](https://material-ui.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Built With

- [Parcel 2](https://v2.parceljs.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Lint-Staged](https://github.com/okonet/lint-staged#readme)
- [Commitlint](https://commitlint.js.org/#/)
- [Nodemon](https://nodemon.io/)

### Tested With

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### System Requirements

- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker-Compose v1](https://docs.docker.com/compose/)

### Setting up Dev

1. Clone the repository:

```shell
git clone https://github.com/SafaeMT/blog-engine.git
cd blog-engine/
```

2. Set up the dual development:
   > Development is done within Docker containers and commits are pushed from our local machine

a) Install the dependencies

```shell
npm ci
```

b) Create and start containers (services)

```shell
docker-compose up --build
```

c) To install a new package

```shell
docker-compose exec web <install command>
```

d) To stop and remove all the containers

```shell
docker-compose down
```

## Licensing

[MIT licensed](LICENSE).
