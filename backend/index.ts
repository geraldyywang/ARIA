import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const generateRoute = require("./routes/generate");
const testRoute = require("./routes/test");

app.use("/generate", generateRoute);
app.use("/test", testRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
