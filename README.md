![My Project Header](.github/image/header.png)

# ADS-B receiver

This repository is a part of the [Flight Tracker](https://flights.barcz.me) project.

## Repository contents
Repository contains an ADS-B receiver API that receives data from virtual, flight-simulator-based sources. Project is
using **Node.js** with **TypeScript**, with **Nest.js** framework and handles HTTP requests. It is close-to-real **ADS-B
over HTTP** implementation, which can be used to test ADS-B clients or other applications that consume ADS-B data.

[![Technologies used in project](https://skillicons.dev/icons?i=nodejs,ts,nestjs,docker)](https://skillicons.dev)

## Infrastructure

Locally, environment is set up using `docker compose`.

### Setting the project up

This app uses docker-based virtualization to run. To set up a project, follow these steps:

1. Clone project by running:
    ```shell
    git clone git@github.com:oskarbarcz/adsb-receiver-api.git
    ```
2. Prepare an environment variable file by copying `.env.dist` to `.env` and fill it with your data.
    ```shell
    cd adsb-receiver-api
    cp .env.dist .env
    ```
3. Use `docker compose` to set up the environment

    ```shell
    docker compose up -d --build
    ```

    Packages, database schema, seed data will be configured automatically.

4. Your project should be up and running. Open browser and go to http://localhost/api to see the api documentation.
   You can preview app logs by running:
    ```shell
    docker compose logs -f app
    ```

### Running the project tips

> **Do not execute NPM or any other commands regarding project from your host machine, use container shell instead.**
> For example, to generate Prisma schema run:
>
> ```shell
> docker compose exec app npm run lint
> ```
>
> It will execute the `npm run lint` command in the container shell.

To shut the containers run:

```shell
docker compose down
```

## Testing

To run tests, execute the following commands:

```bash
# unit tests
$ docker compose exec app npm run test

# functional tests
$ docker compose exec app npm run test:functional
```

We use **Jest** for unit tests, and **cucumber-js** for functional tests. Unit tests are stored in the `src` directory
just near the tested module, while functional tests are stored in the `features` directory.

## Release & deploy

> Before merging Pull Request to the main branch, make sure to bump the project version in the `package.json` file,
> line `3`. Then it is a good practice to run `npm install` inside a docker container to update the `package-lock.json`
> file.
>
> Not bumping the version will result in the release failure. There is a step in CI that will protect the main branch
> from being merged without bumping the version.
