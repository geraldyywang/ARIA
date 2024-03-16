// Transcribe.js
// api key: 
// "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";
// const audioFile = ...; // Your audio file object
// const modelName = 'whisper-1'; // Replace with your desired model name
// const language = 'en'; // Replace with the desired language code

import axios from 'axios';

const API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/audio/transcriptions';

const transcribeAudio = async (audioFile, modelName, language) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', modelName);
    formData.append('language', language);

    const response = await axios.post(API_ENDPOINT, formData, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)
    return response.data.text;
  } catch (error) {
    throw error;
  }
};

export { transcribeAudio };
