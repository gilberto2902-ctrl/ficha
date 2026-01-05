
import { GoogleGenAI } from "@google/genai";

export async function askGemini(question: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Você é um assistente da Associação Amor e Bondade. 
        Sua função é ajudar os pais e responsáveis a preencher o formulário de rematrícula para o ano de 2026.
        A associação oferece atividades como Capoeira, Karatê, Boxe, Jiu-jitsu, Ritmo dança, Futebol, Pilates, Balé e Hip Hop.
        
        Pergunta do usuário: ${question}
        
        Responda de forma gentil e útil em português do Brasil. Se for uma dúvida sobre benefícios sociais (como CADÚnico ou Bolsa Família), explique brevemente o que são e sua importância no contexto social da associação.
      `,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, tive um problema ao processar sua dúvida. Por favor, tente novamente mais tarde.";
  }
}
