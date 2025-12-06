import { GoogleGenAI } from "@google/genai";

const getClient = (): GoogleGenAI | null => {
    // Check both standard Node process.env and Vite's import.meta.env
    const apiKey = (import.meta as any).env?.VITE_API_KEY || (process as any).env?.API_KEY;
    
    if (!apiKey) {
        console.warn("API_KEY is not defined. Using template mode.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const streamChatResponse = async (
    history: { role: string; content: string }[],
    newMessage: string,
    onChunk: (text: string) => void
) => {
    try {
        const ai = getClient();
        
        if (!ai) {
             // Template Response logic for Demo/No-Key scenarios
             const templateMsg = "Thank you for contacting DeepNeurax Technologies! As this is a demo environment, I am currently in template mode. Our team specializes in AI, IoT, and Cloud solutions. Please use the 'Get a Quote' button to connect with our experts directly!";
             
             // Simulate natural typing delay
             const chunks = templateMsg.match(/.{1,3}/g) || [];
             for (const chunk of chunks) {
                 await new Promise(resolve => setTimeout(resolve, 30));
                 onChunk(chunk);
             }
             return;
        }
        
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are the AI Assistant for DeepNeurax Technologies. You are professional, knowledgeable about DeepNeurax's services (AI, IoT, Software Development, Cybersecurity), and helpful. Keep answers concise and business-oriented.",
            },
        });

        // Send the message to the model
        const result = await chat.sendMessageStream({ message: newMessage });

        for await (const chunk of result) {
             if (chunk.text) {
                 onChunk(chunk.text);
             }
        }

    } catch (error) {
        console.error("Error generating content:", error);
        // Fallback for API errors
        const errorMsg = "I apologize, but I am currently unable to connect to the AI service. Please try again later or contact our support team directly.";
        onChunk(errorMsg);
    }
};