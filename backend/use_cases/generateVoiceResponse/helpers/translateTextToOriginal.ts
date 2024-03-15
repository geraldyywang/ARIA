import { Translate } from "@google-cloud/translate/build/src/v2";

const translate: Translate = new Translate();

export const translateTextToOriginal = async (
  text: string,
  language: string
): Promise<string> => {
  // translate text to original language with Google Translate API
  let [translations] = await translate.translate(text, language);
  console.log(`Translated text before send to audio ${translations}`);

  return translations;
};
