import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

export async function POST(request) {
  try {
    const { message } = await request.json();

    const result = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: message }] }]
      // contents: message
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of result) {
         let chunkText = "";
if (chunk.candidates?.length) {
  const parts = chunk.candidates[0].content.parts;
  if (parts?.length && parts[0].text) {
    chunkText = parts[0].text;
  }
}
          if (chunkText) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content: chunkText })}\n\n`)
            );
          }
        }
        controller.close();
      }
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });

  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error.message,
      }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
}
