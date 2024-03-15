import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Base URL");
});

const generateRoute = require("./routes/generate");
app.use("/generate", generateRoute);

const test = require("./routes/test");
app.use("/test", test);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
