import { text } from "express";
import { generateResponse } from "./generateResponse";
import { translateSpeechToEn } from "./translateSpeechToEn";
import { textToSpeech } from "./textToSpeech";
import { translateTextToOriginal } from "./translateTextToOriginal";

export const generateVoiceResponse = async (
  language: string,
  transcribedText: any
): Promise<[string, any]> => {
  const apiKey: string | undefined = process.env.OPENAI_API_KEY;

  // translate audio file to text and translate
  const translated: string = await translateSpeechToEn(transcribedText);
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
  const audioFileResponse: string | Uint8Array | null | undefined =
    await textToSpeech(generatedResponse, language);

  return [generatedResponse, audioFileResponse];
};
