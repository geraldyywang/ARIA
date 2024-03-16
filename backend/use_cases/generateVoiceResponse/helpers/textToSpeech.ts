import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { writeFileSync } from "fs";
import { isoToDialectMap } from "./isoToDialectMap";

const client: TextToSpeechClient = new TextToSpeechClient();

export const textToSpeech: any = async (text: string, language: string) => {
  // translate text to audio file
  try {
    let dialect: string = isoToDialectMap[language];
    let languageCode: string = dialect.substring(0, 5);
    if (language === "zh") {
      languageCode = dialect.substring(0, 6);
    }

    // console.log(language, dialect, languageCode);

    const request = {
      input: { text: text },
      voice: {
        languageCode: languageCode,
        ssmlGender: "FEMALE" as const,
        voice: dialect,
      },
      audioConfig: { audioEncoding: "MP3" as const },
    };

    const response = await client.synthesizeSpeech(request);
    const audioBuffer = Buffer.from(response[0].audioContent as string);
    writeFileSync("output.mp3", audioBuffer, "binary");

    // console.log(response[0].audioContent);

    return response[0].audioContent;
  } catch (error) {
    console.error(error);
    return "Error translating text to audio file.";
  }
};
