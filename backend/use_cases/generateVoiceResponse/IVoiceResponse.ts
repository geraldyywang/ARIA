export interface IVoiceResponse {
  generateVoiceResponse(
    language: string,
    transcribedText: string
  ): Promise<[string, any]>;
}
