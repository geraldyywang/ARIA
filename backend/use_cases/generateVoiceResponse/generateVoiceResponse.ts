import { text } from "express";
import { generateResponse } from "./generateResponse";
import { translateSpeech } from "./translateSpeech";
import { textToSpeech } from "./textToSpeech";
import { translateTextToOriginal } from "./translateTextToOriginal";

export const generateVoiceResponse = async (
  language: string,
  audioFile: any
): Promise<any> => {
  const apiKey: string | undefined = process.env.OPENAI_API_KEY;

  // translate audio file to text and translate
  const translated: string = await translateSpeech(audioFile, language, apiKey);
  // take text and generate response
  let generatedResponse: string = await generateResponse(translated, apiKey);

  if (language !== "en") {
    // translate response to original language
    generatedResponse = await translateTextToOriginal(
      generatedResponse,
      language
    );
  }

  // take response and convert to audio file
  const audioFileResponse: any = await textToSpeech(
    generatedResponse,
    language
  );

  return audioFileResponse;
};
