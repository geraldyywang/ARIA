import { text } from "express";
import { generateResponse } from "./helpers/generateResponse";
import { translateSpeechToEn } from "./helpers/translateSpeechToEn";
import { textToSpeech } from "./helpers/textToSpeech";
import { translateTextToOriginal } from "./helpers/translateTextToOriginal";
import { IVoiceResponse } from "./IVoiceResponse";

export class VoiceResponse implements IVoiceResponse {
  generateVoiceResponse = async (
    language: string,
    transcribedText: any
  ): Promise<[string, any]> => {
    const apiKey: string | undefined =
      "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";

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

    // // take response and convert to audio file
    // const audioFileResponse: string | Uint8Array | null | undefined =
    //   await textToSpeech(generatedResponse, language);

    return [generatedResponse, null];
  };
}
