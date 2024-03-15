import express, { Express, Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from the backend!");
});

// router.get("/", (req: any, res: any) => {
//   res.send("Hello from the backend!");
// });

module.exports = router;
