"use strict";

import {
  DiagConsoleLogger,
  DiagLogLevel,
  context,
  diag,
  trace,
} from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';

const tracer = trace.getTracer("example-otlp-exporter-node");

function doWork(parent: any) {
  // Start another span. In this example, the main method already started a
  // span, so that'll be the parent span, and this will be a child span.
  const ctx = trace.setSpan(context.active(), parent);
  const span = tracer.startSpan("doWork", undefined, ctx);

  // simulate some random work.
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // empty
  }

  // Set attributes to the span.
  span.setAttribute("key", "value");
  // span.setAttribute("mapAndArrayValue", [
  //   0,
  //   1,
  //   2.25,
  //   "otel",
  //   {
  //     foo: "bar",
  //     baz: "json",
  //     array: [1, 2, "boom"],
  //   },
  // ]);

  // Annotate our span to capture metadata about our operation
  span.addEvent("invoking doWork");

  // end span
  span.end();
}

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const exporter = new OTLPTraceExporter({
  // headers: {
  //   foo: 'bar'
  // },
});

const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "opentelemetry-spike-tracing",
  }),
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

// Create a span. A span must be closed.
const parentSpan = tracer.startSpan("main");

for (let i = 0; i < 10; i += 1) {
  doWork(parentSpan);
}
// Be sure to end the span.
parentSpan.end();

// give some time before it is closed
setTimeout(() => {
  // flush and close the connection.
  exporter.shutdown();
}, 2000);
