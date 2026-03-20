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
  "Parsing scientific databases...",
  "Activating Reality Engine...",
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
          className="fixed inset-0 flex flex-col items-center justify-center z-[100]"
          style={{ background: '#0A0B0F' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Nebula glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-[600px] h-[600px] rounded-full nebula-bg"
              style={{
                left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, rgba(123,92,240,0.04) 40%, transparent 70%)',
              }}
            />
          </div>

          {/* Floating particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 2 === 0 ? 'rgba(79,142,247,0.4)' : 'rgba(123,92,240,0.3)',
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center relative z-10">
            {/* Logo */}
            <motion.div
              className="w-[100px] h-[100px] rounded-[20px] flex items-center justify-center mb-8 overflow-hidden"
              animate={{ boxShadow: ['0 0 20px rgba(79,142,247,0.15)', '0 0 40px rgba(79,142,247,0.3)', '0 0 20px rgba(79,142,247,0.15)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <img src={logoImg} alt="ApeironAI" className="w-full h-full object-contain" />
            </motion.div>

            <h1 className="font-display text-[22px] font-bold tracking-tight text-foreground">
              ApeironAI Reality Lab
            </h1>
            <p className="text-[12px] mt-2 text-muted-foreground">
              Powered by Cherazen Research Systems
            </p>
          </motion.div>

          {/* Loading bar */}
          <div className="mt-10 w-full max-w-[280px] px-8 relative z-10">
            <div className="h-[2px] w-full rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, hsl(220 90% 56%), hsl(261 85% 60%))',
                }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-[11px] text-center mt-3 text-muted-foreground"
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="absolute bottom-8 right-8 font-mono text-[11px] text-muted-foreground/40">
            {Math.min(Math.floor(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
