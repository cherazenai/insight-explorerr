import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";

interface BootSequenceProps {
  onComplete: () => void;
}

const loadingTexts = [
  "Initializing neural subsystems...",
  "Loading knowledge graph nodes...",
  "Calibrating reasoning engines...",
  "Syncing discovery databases...",
  "Activating IntelliZ core...",
];

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 45);

    const textInterval = setInterval(() => {
      setTextIndex((i) => (i + 1) % loadingTexts.length);
    }, 500);

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 600);
    }, 2800);

    return () => { clearInterval(interval); clearInterval(textInterval); clearTimeout(exitTimer); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-[100] scanline"
          style={{ background: '#080C10' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle particle dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 3 === 0 ? 'hsl(6 78% 57% / 0.4)' : 'hsl(210 40% 93% / 0.15)',
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Logo */}
            <motion.div
              className="w-[120px] h-[120px] rounded-[20px] flex items-center justify-center mb-6 overflow-hidden"
              animate={{ boxShadow: ['0 0 20px hsl(6 78% 57% / 0.2)', '0 0 40px hsl(6 78% 57% / 0.4)', '0 0 20px hsl(6 78% 57% / 0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img src={logoImg} alt="IntelliZ Research" className="w-full h-full object-contain" />
            </motion.div>

            <h1 className="text-[22px] font-bold tracking-tight" style={{ color: '#EAF0F6' }}>
              IntelliZ Research
            </h1>
            <p className="text-[11px] mt-1" style={{ color: '#2D4255' }}>
              Powered by Cherazen Research Systems
            </p>
          </motion.div>

          {/* Loading bar */}
          <div className="mt-8 w-full max-w-[320px] px-8 relative z-10">
            <div className="h-[3px] w-full rounded-full" style={{ background: '#1C2A35' }}>
              <motion.div
                className="h-full rounded-full red-glow"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #C0392B, #E74C3C)',
                }}
              />
            </div>
            {/* Typewriter loading text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-[11px] text-center mt-3"
                style={{ color: '#6B8599' }}
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress % */}
          <p className="absolute bottom-8 right-8 font-mono text-[11px]" style={{ color: '#2D4255' }}>
            {Math.min(Math.floor(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
