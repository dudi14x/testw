import { useEffect } from "react";

const TAWK_PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID as string | undefined;
const TAWK_WIDGET_ID = import.meta.env.VITE_TAWK_WIDGET_ID as string | undefined;

/**
 * Loads Tawk.to chat widget (free forever, unlimited conversations)
 * Smaller on desktop, even smaller on mobile/tablet
 */
export default function ChatWidget() {
  useEffect(() => {
    if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) return;
    if (TAWK_PROPERTY_ID.includes("your_") || TAWK_PROPERTY_ID === "YOUR_PROPERTY_ID") return;

    if (document.querySelector(`script[src*="embed.tawk.to"]`)) return;

    // Set customStyle before script loads (Tawk API requirement)
    (window as unknown as { Tawk_API?: { customStyle?: { zIndex?: number } } }).Tawk_API =
      (window as unknown as { Tawk_API?: object }).Tawk_API || {};
    (window as unknown as { Tawk_API: { customStyle?: { zIndex?: number } } }).Tawk_API.customStyle = { zIndex: 9999 };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
