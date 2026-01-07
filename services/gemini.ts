
import { GoogleGenAI } from "@google/genai";

// Standardizing Gemini API call to follow strict guidelines
export async function askGemini(question: string) {
  try {
    // Guidelines require initializing with process.env.API_KEY directly as a named parameter
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Você é um assistente da Associação Amor e Bondade. 
        Sua função é ajudar os pais e responsáveis a preencher o formulário de rematrícula para o ano de 2026.
        A associação oferece atividades como Capoeira, Karatê, Boxe, Jiu-jitsu, Ritmo dança, Futebol, Pilates, Balé e Hip Hop.
        
        Pergunta do usuário: ${question}
        
        Responda de forma gentil e útil em português do Brasil. Se for uma dúvida sobre benefícios sociais, explique sua importância.
      `,
    });
    // The response.text is a property, not a method.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, tive um problema ao processar sua dúvida.";
  }
}
