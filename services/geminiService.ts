import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArchitectCode = async (
  imageBase64: string,
  mimeType: string,
  vibeDescription: string
): Promise<string> => {
  try {
    // Using gemini-3-pro-preview for superior reasoning and coding capabilities
    // enabling a higher thinking budget for complex layout analysis.
    const modelId = 'gemini-3-pro-preview'; 

    const prompt = `
      You are "The Architect", a world-class Frontend Engineer and UI Designer.
      
      TASK:
      1. Analyze the spatial layout of the provided image (sketch/wireframe). Identify navigation, hero sections, grids, cards, inputs, and buttons.
      2. Interpret the requested "Vibe": "${vibeDescription}".
      3. Generate a SINGLE-FILE HTML solution using Tailwind CSS that perfectly matches the wireframe's layout but applies the requested visual aesthetic (colors, fonts, shadows, border-radius).
      
      REQUIREMENTS:
      - Use Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>).
      - Use Google Fonts if the vibe calls for it (include the <link> tag).
      - Ensure the layout is responsive (mobile-first approach).
      - Use https://picsum.photos/width/height for any placeholder images needed.
      - Output ONLY the raw HTML code. Do not include markdown code blocks (no \`\`\`html).
      - Do not provide explanations, just the code.
      - Ensure the background color is applied to the body tag.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: imageBase64
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        thinkingConfig: { thinkingBudget: 4096 }, // Allocate budget for visual reasoning
        temperature: 0.7,
      }
    });

    const text = response.text;
    
    if (!text) {
      throw new Error("No code generated.");
    }

    // Cleanup if the model accidentally included markdown despite instructions
    return text.replace(/```html/g, '').replace(/```/g, '');

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
