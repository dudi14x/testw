type AudioContextType = typeof AudioContext;
type WebKitAudioContext = {
  new (): AudioContext;
};

interface WindowWithAudioContext extends Window {
  webkitAudioContext?: WebKitAudioContext;
}

const getAudioContext = (): AudioContext | null => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as WindowWithAudioContext).webkitAudioContext;
    return AudioContextClass ? new AudioContextClass() : null;
  } catch {
    return null;
  }
};

export default function useClickSound() {
  return (): void => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 520;

      gainNode.gain.value = 0.08;

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      setTimeout(() => {
        oscillator.stop();
        ctx.close();
      }, 120);
    } catch {
      // Ignore if blocked by browser autoplay policy
    }
  };
}
