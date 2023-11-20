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

## View Zipkin

Head to [http://localhost:9411/zipkin/](http://localhost:9411/zipkin/) to view the Zipkin GUI and query traces

## View Prometheus

Head to [http://localhost:9090/](http://localhost:9090/) to view the Prometheus GUI and query metrics. NB: It may take some time for metrics to propagate in Prometheus due to how the OTEL collector batches the data it sends.
