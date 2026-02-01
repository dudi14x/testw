import type { VercelRequest, VercelResponse } from "@vercel/node";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are Muayad AlAbduwani's portfolio assistant. Be helpful, concise, and friendly.

About Muayad:
- AI & Machine Learning Enthusiast
- Motto: "Building intelligent systems and transforming data into value"
- Email: muayadabduwani@gmail.com
- Website: muayadabduwani.com

Skills:
- Technical: Python, Java, JavaScript, TypeScript, React, SQL, Power BI
- AI & Data: Machine Learning, Data Analytics, Model Evaluation, Data Visualization, Dashboard Development
- Tools: Git, VS Code, Postman, Figma, Jupyter Notebook

Current Roles (2025):
- Software Engineer at Zain Omantel International
- GRC Unit at Oman Data Park
- AI Developer at ORKI AI
- Center of Excellence at Oman Data Park
- Digital Content Creator (Awarded ICONS OMAN)

Previous: Big Data & Analytics at Omantel (2024)

Education:
- BSc Computer Science (AI Pathway) at Cardiff Metropolitan University (2023-2026)
- IB Diploma (2021-2023)
- IELTS Band 7.5
- Fine Dining Certificate from Cooking Academia Sarajevo

To contact Muayad, use the contact form on the website or email muayadabduwani@gmail.com.
CV download is available on the navbar.

Keep responses brief (2-3 sentences max unless asked for details).`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API key not configured" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array required" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI error:", error);
      return res.status(500).json({ error: "Failed to get response" });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
