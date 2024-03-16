import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { writeFileSync } from "fs";

const client: TextToSpeechClient = new TextToSpeechClient();

export const textToSpeech: any = async (text: string, language: string) => {
  // translate text to audio file
  try {
    const request = {
      input: { text: text },
      voice: { languageCode: language, ssmlGender: "FEMALE" as const },
      audioConfig: { audioEncoding: "MP3" as const },
    };

    const response = await client.synthesizeSpeech(request);
    const audioBuffer = Buffer.from(response[0].audioContent as string);
    writeFileSync("../../test_audio/output.mp3", audioBuffer, "binary");

    return response[0].audioContent;
  } catch (error) {
    console.error(error);
    return "Error translating text to audio file.";
  }
};
