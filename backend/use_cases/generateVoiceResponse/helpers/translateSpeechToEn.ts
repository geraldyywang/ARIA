import { Translate } from "@google-cloud/translate/build/src/v2";

const translate: Translate = new Translate();

export const translateSpeechToEn = async (
  transcribedText: string
  // apiKey: string | undefined
): Promise<string> => {
  // translate audio file to text
  try {
    let [translations] = await translate.translate(transcribedText, "en");
    console.log(translations);

    return translations;
  } catch (error) {
    console.error(error);
    return "Error translating transcribedText to English.";
  }
};
