import { text } from "express";
import { generateResponse } from "./helpers/generateResponse";
import { translateSpeechToEn } from "./helpers/translateSpeechToEn";
import { textToSpeech } from "./helpers/textToSpeech";
import { translateTextToOriginal } from "./helpers/translateTextToOriginal";
import { IVoiceResponse } from "./IVoiceResponse";

export class VoiceResponse implements IVoiceResponse {
  generateVoiceResponse = async (
    language: string,
    transcribedText: string
  ): Promise<[string, any]> => {
    const apiKey: string | undefined =
      "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";

    // translate audio file to text and translate
    let translated: string = await translateSpeechToEn(transcribedText);
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
    const audioFileResponse: Uint8Array = await textToSpeech(
      generatedResponse,
      language
    );

    // for (let i = 0; i < audioFileResponse.length; ++i) {
    //   audioFileResponse[i] *= 2;
    // }

    let binaryString: string = "";
    audioFileResponse.forEach((byte: any) => {
      binaryString += String.fromCharCode(byte);
    });

    // Encode the binary string to base64
    const base64String = btoa(binaryString);

    return [generatedResponse, base64String];
  };
}
