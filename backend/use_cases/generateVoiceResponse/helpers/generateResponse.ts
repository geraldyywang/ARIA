import OpenAI from "openai";
import { ChatCompletion } from "openai/resources";

export const generateResponse = async (
  translatedText: string,
  apiKey: string | undefined
): Promise<string> => {
  // take text and generate response
  try {
    const openai = new OpenAI({ apiKey });
    const completion: ChatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for refugees in Canada named Aria. Keep your responses within 2 sentences. After your response, suggest a relevant follow up question.",
        },
        { role: "user", content: `${translatedText}` },
      ],
      model: "gpt-3.5-turbo",
    });

    const response: string | null = completion.choices[0].message.content;
    const tokensUsed: number | undefined = completion.usage?.total_tokens;
    console.log(response, tokensUsed);

    return response ? response : "No response generated.";
  } catch (error) {
    console.error(error);
    return "Error generating response.";
  }
};
