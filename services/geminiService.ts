import { GoogleGenAI, Type } from "@google/genai";

const IdeasSchema = {
  type: Type.OBJECT,
  properties: {
    ideas: {
      type: Type.ARRAY,
      description: "Daftar 30 ide postingan media sosial.",
      items: {
        type: Type.STRING,
        description: "Satu ide konten spesifik."
      }
    }
  },
  required: ['ideas']
};

export async function generateContentIdeas(industry: string): Promise<string[]> {
  // Assume process.env.API_KEY is available in the environment
  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Anda adalah seorang ahli strategi media sosial yang kreatif. Untuk bisnis di industri '${industry}', buatlah 30 ide konten unik dan menarik untuk postingan media sosial selama sebulan. Pastikan ide-ide tersebut bervariasi, mencakup: promosi produk/jasa, konten di balik layar, tips edukatif, interaksi dengan audiens (seperti polling atau kuis), dan konten yang membangun merek. Sajikan hasil dalam format JSON yang valid, dengan satu kunci utama 'ideas' yang berisi array dari 30 string. Setiap string dalam array adalah satu ide konten.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: IdeasSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });
    
    const responseText = response.text.trim();
    const result = JSON.parse(responseText);

    if (result && Array.isArray(result.ideas)) {
      return result.ideas;
    } else {
      throw new Error("Format respons tidak valid dari API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gagal menghasilkan ide. Silakan coba lagi nanti.");
  }
}
