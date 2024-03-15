import express from "express";
const router = express.Router();

router.get("/test", (req: any, res: any) => {
  res.send("Hello from the backend!");
});
