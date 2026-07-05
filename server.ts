import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini theological research assistance
  app.post('/api/gemini/research', async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Return a realistic theological helper response if API key is not configured
        console.warn('GEMINI_API_KEY not set. Returning high-quality mock theological response.');
        
        let reply = "Greetings from the Living Waters virtual study assistant. I see you are inquiring about theological studies. (Please configure your GEMINI_API_KEY in Settings > Secrets for real-time AI responses!)\n\nBased on general theological principles:\n- **Exegesis**: Carefully drawing out the text's original meaning is foundational.\n- **Hermeneutics**: Bridging that text to our contemporary context requires prayerful reflection.\n\nHow can I further assist your studies today?";
        if (message?.toLowerCase().includes('grace')) {
          reply = "In Christian theology, **Grace** (charis) is the unmerited favor of God. It stands at the heart of the Gospel, signifying that salvation and reconciliation are entirely gifts of God rather than human achievements. Excellent topic for your seminary reflection paper!";
        } else if (message?.toLowerCase().includes('hermeneutics') || message?.toLowerCase().includes('interpret')) {
          reply = "Hermeneutics is the theory and methodology of interpretation, especially the interpretation of biblical texts. It involves understanding the historical, cultural, and literary context of the scripture to faithfully apply its message today.";
        }
        
        return res.json({ text: reply, simulated: true });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Prepare context for Theological Seminary Assistant
      const systemInstruction = 
        "You are the Living Waters Theological Seminary AI Research Assistant. " +
        "Your role is to help seminary students, faculty, and staff with academic research, " +
        "biblical exegesis, hermeneutical studies, course preparation, sermon drafting, and theological inquiries. " +
        "Provide insightful, scholarly, yet pastoral and encouraging responses. Use structured markdown formatting, " +
        "including bullet points and bold text, to make responses easy to read. Suggest standard theological methodologies " +
        "and reference scriptures when appropriate.";

      // Let's use the chats feature if history is provided, otherwise standard generateContent
      if (history && Array.isArray(history) && history.length > 0) {
        // Prepare chat history in correct format
        const chat = ai.chats.create({
          model: 'gemini-3.5-flash',
          config: {
            systemInstruction: systemInstruction,
          },
        });
        
        // Unfortunately, chats in the SDK usually start empty and we send messages, or we can just send the message.
        // To be safe, we can compile the history into a single prompt or use generateContent with conversational history.
        // Let's pass a structured prompt including history to generateContent to ensure high reliability.
      }

      // Compile a comprehensive prompt with recent dialogue context if available
      let fullPrompt = message;
      if (history && Array.isArray(history) && history.length > 0) {
        const historyText = history
          .slice(-6) // take last 6 messages
          .map((msg: any) => `${msg.role === 'user' ? 'Student' : 'Assistant'}: ${msg.content}`)
          .join('\n');
        fullPrompt = `Study Conversation History:\n${historyText}\n\nStudent's New Inquiry: ${message}\n\nPlease respond as the Living Waters Theological Seminary Assistant:`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({ text: response.text || 'No response generated.' });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return res.status(500).json({ error: error.message || 'Internal server error occurred.' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
