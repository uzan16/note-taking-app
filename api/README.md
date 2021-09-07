# Note Taking Sample REST API

## Introduction

This is a sample REST API project created for the purpose of connecting a front-end
note taking app to.

## Requirements

You will need Docker to be installed, which you can obtain from the official site if you
don't have it already: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).

The provided [docker-compose.yml](docker-compose.yml) will allow you to launch the REST API
in an isolated environment without your system needing any additional requirements.

## Running the API

Ensure that you've changed into the `api` directory, then execute the docker-compose command:

```shell
cd api
docker-compose up --build
```

This should spin up the API (a Python FastAPI server) and a Postgres DB instance for it to
connect to. The API should then be serving from: `http://localhost:8000`.

### Cleaning up

When you're done running the API and wish to clean up everything that was created by Docker,
run the following to delete the containers:

```shell
docker-compose down
```

## API Endpoints

Since the API generates its own OpenAPI documentation, you can access the Swagger UI via:
[http://localhost:8000/docs](http://localhost:8000/docs), or the ReDoc UI via: [http://localhost:8000/redoc](http://localhost:8000/redoc).

Both will tell you about each available endpoint and the expected methods and request payloads
needed to invoke them, along with the response payloads. You can use these as a reference for
the endpoints that your own UI app will need to consume.

## Issues?

This backend has been tested on a few machines, but we appreciate nuances between Docker
installations could result in unexpected errors. Do make sure you're running the latest
version of Docker before running this application. Finally, if all else fails and
StackOverflow's infinite wisdom doesn't cut it, please reach out to us.
