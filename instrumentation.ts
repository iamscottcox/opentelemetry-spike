import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { NodeSDK } from "@opentelemetry/sdk-node";

const sdk = new NodeSDK({
  serviceName: "opentelemetry-spike", // This is required for Zipkin
  traceExporter: new ZipkinExporter(),
  metricReader: new PrometheusExporter({
    port: 9464, // optional - default is 9464
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
