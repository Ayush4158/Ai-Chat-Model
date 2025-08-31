import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEMINI_KEY})

export async function POST(request){
  try {
    
    const {message} = await request.json()

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
    //   config: {
    //   thinkingConfig: {
    //     thinkingBudget: 0, // Disables thinking
    //   },
    // },
    // config: {
    //   systemInstruction: "Your name is maka. and you know hindi language and you can give hindi ",
    // },
      contents: message
    });

    return new Response(
      JSON.stringify({ response: response.text }),
      {
        headers: {"Content-Type": "application/json"}, status: 200
      }
    );
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
