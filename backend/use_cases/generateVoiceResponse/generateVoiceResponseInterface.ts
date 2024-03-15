import { generateVoiceResponse } from "./generateVoiceResponse";

export interface GenerateVoiceResponseInterface {
  generateVoiceResponse(language: string, audioFile: any): Promise<any>;
}
