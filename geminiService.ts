
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChampionInsights = async (championName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Forneça curiosidades interessantes e dicas rápidas de gameplay para o campeão ${championName} de League of Legends em português. Seja conciso e profissional, como se fosse um guia oficial da Riot Games.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching insights:", error);
    return "Falha ao carregar insights do servidor Riot.";
  }
};
