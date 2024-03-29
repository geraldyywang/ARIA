import { VoiceResponse } from "../use_cases/generateVoiceResponse/VoiceResponse";
import { IVoiceResponse } from "../use_cases/generateVoiceResponse/IVoiceResponse";

const express = require("express");
const router = express.Router();

router.post("/", (req: any, res: any) => {
  // Need to send back mp3, text, maps api coordinates
  const language: string = req.body.language;
  const transcribedText = req.body.transcribedText;

  const voiceResponse: IVoiceResponse = new VoiceResponse();
  voiceResponse
    .generateVoiceResponse(language, transcribedText)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
