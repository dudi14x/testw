import { FormEvent, useState, useRef, useEffect } from "react";

const CONTACT_EMAIL = "muayadabduwani@gmail.com";
const STATUS_RESET_DELAY = 3000; // ms

// Formspree form ID - create free at https://formspree.io and add to .env as VITE_FORMSPREE_ID
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus("submitting");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const resetStatus = () => {
      timeoutRef.current = setTimeout(() => {
        setStatus("idle");
        timeoutRef.current = null;
      }, STATUS_RESET_DELAY);
    };

    try {
      if (FORMSPREE_ID) {
        // Send via Formspree - emails delivered directly to your inbox
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `Contact from ${formData.name}`,
          }),
        });

        if (!res.ok) throw new Error("Form submission failed");
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Fallback: open mail client (does not send automatically)
        const subject = encodeURIComponent(`Contact from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }

      resetStatus();
    } catch {
      setStatus("error");
      resetStatus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isSubmitting = status === "submitting";

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16"
      aria-label="Contact section"
    >
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Interested in collaborating or discussing opportunities?
            Feel free to reach out.
          </p>
        </div>

        <div className="rounded-2xl p-6 sm:p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 transition-all"
                placeholder="Your name"
                required
                disabled={isSubmitting}
                aria-label="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 transition-all"
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
                aria-label="Your email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 transition-all resize-none"
                rows={5}
                placeholder="Tell me about your project or just say hello..."
                required
                disabled={isSubmitting}
                aria-label="Your message"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Sending...
                </span>
              ) : status === "success" ? (
                "✓ Message Sent!"
              ) : (
                "Send Message"
              )}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again or email directly.
              </p>
            )}

            {status === "success" && (
              <p className="text-green-400 text-sm text-center">
                {FORMSPREE_ID ? (
                  "Thanks! Your message has been sent and I'll get back to you soon."
                ) : (
                  <>
                    Your email client should open—complete the send there. Or email directly at{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-cyan-400 hover:text-cyan-300 underline focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </>
                )}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
