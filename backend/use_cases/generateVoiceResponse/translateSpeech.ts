import OpenAI from "openai";
import fs from "fs";
import { Translation } from "openai/resources/audio/translations";

export const translateSpeech = async (
  audioFilePath: any,
  language: string,
  apiKey: string | undefined
): Promise<string> => {
  // translate audio file to text
  try {
    const openai = new OpenAI({ apiKey });
    const translation: Translation = await openai.audio.translations.create({
      file: fs.createReadStream(audioFilePath),
      model: "whisper-1",
    });

    console.log(translation.text);

    return translation.text;
  } catch (error) {
    console.error(error);
    return "Error translating audio file to text.";
  }
};
