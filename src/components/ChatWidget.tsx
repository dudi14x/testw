import { useEffect } from "react";

const CHATBASE_CHATBOT_ID = import.meta.env.VITE_CHATBASE_CHATBOT_ID as string | undefined;

/**
 * Loads Chatbase AI chat widget (free tier, AI-powered, no greeting bubbles)
 * Get your chatbot ID: chatbase.co → Dashboard → Agent → Deploy → Chat widget → Embed tab
 */
export default function ChatWidget() {
  useEffect(() => {
    const chatbotId = CHATBASE_CHATBOT_ID?.trim();

    if (!chatbotId || chatbotId.includes("your_")) return;

    if (document.querySelector(`script[src*="chatbase.co"][src*="embed"]`)) return;

    // Set config BEFORE script loads - disables floating bubbles
    (window as unknown as { chatbaseConfig?: object }).chatbaseConfig = {
      showFloatingInitialMessages: false,
    };
    (window as unknown as { embeddedChatbotConfig?: { chatbotId: string; domain: string } }).embeddedChatbotConfig = {
      chatbotId,
      domain: "www.chatbase.co",
    };

    const script = document.createElement("script");
    script.src = `https://www.chatbase.co/embed.min.js?chatbotId=${encodeURIComponent(chatbotId)}&domain=www.chatbase.co`;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
