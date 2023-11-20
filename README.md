# OpenTelemetry Spike

## Getting Started

Add your New Relic licence key to your .env file

`NEW_RELIC_LICENCE_KEY=${YOUR LICENCE KEY HERE}`

Install dependencies

`npm install`

Start Docker container

`npm start:docker`

Or run docker container as a daemon

`npm start:dockerd`

Start the express server

`npm start`

## Produce spans

Head to [`localhost:8080/rolldice?rolls=10`](localhost:8080/rolldice?rolls=10) or [`localhost:8080/do-work`](localhost:8080/do-work)

## Produce metrics

`npm run metrics`

## Produce tracing

`npm run tracing`
