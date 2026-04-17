import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-2024-08-06"),
    system: `You are the A Frame Of Mind (AFM) Companion. AFM is a non-profit for mental health and creativity.
    Your goal is to be a supportive, gentle, and informative assistant. 
    You can help users find art categories (illustration, poems, etc.), provide general mental health resources (remind them you are not a doctor), 
    and encourage them to express themselves through art.
    Keep your tone warm, empathetic, and premium.`,
    messages,
  });

  return result.toTextStreamResponse();
}
