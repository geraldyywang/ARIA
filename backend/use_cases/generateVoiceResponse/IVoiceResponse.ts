interface IVoiceResponse {
  generateVoiceResponse(
    language: string,
    transcribedText: any
  ): Promise<[string, any]>;
}
