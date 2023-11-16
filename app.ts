import { trace } from "@opentelemetry/api";
import express, { Express } from "express";
import { rollTheDice } from "./dice";

const tracer = trace.getTracer("dice-server", "0.1.0");

const doWork = () => {
  const span1 = tracer.startSpan("work-1");
  console.log("span 1");
  const span2 = tracer.startSpan("work-2");
  console.log("span 2");
  const span3 = tracer.startSpan("work-3");
  console.log("span 3");

  span1.end();
  span2.end();
  span3.end();
};

const PORT: number = parseInt(process.env.PORT || "8080");
const app: Express = express();

app.get("/rolldice", (req, res) => {
  const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : NaN;
  if (isNaN(rolls)) {
    res
      .status(400)
      .send("Request parameter 'rolls' is missing or not a number.");
    return;
  }
  res.send(JSON.stringify(rollTheDice(rolls, 1, 6)));
});

app.get("/do-work", (req, res) => {
  doWork();

  res.send("Check console for the work!");
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
