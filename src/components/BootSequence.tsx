import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cherazenLogo from "@/assets/cherazen-logo.jpg";

const bootLines = [
  { text: "> CHERAZEN_OS v1.04", delay: 0 },
  { text: "> MOUNTING_KNOWLEDGE_GRAPH... OK", delay: 400 },
  { text: "> LOADING_SCIENTIFIC_DATASETS... OK", delay: 800 },
  { text: "> INITIALIZING_REASONING_ENGINE... OK", delay: 1200 },
  { text: "> ACTIVATING_HYPOTHESIS_GENERATOR... OK", delay: 1600 },
  { text: "> SYNCHRONIZING_SIMULATION_ENGINE... OK", delay: 2000 },
  { text: "> SYSTEM READY.", delay: 2400 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 50);

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0A0A0B", zIndex: 100 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-px animate-scan-line"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(29,233,182,0.2), transparent)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mb-10"
          >
            <img src={cherazenLogo} alt="Cherazen" className="w-16 h-16 rounded-lg" />
          </motion.div>

          {/* Boot text */}
          <div className="font-mono text-xs space-y-1.5 max-w-md px-6">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  i === bootLines.length - 1
                    ? "text-lab-teal"
                    : "text-muted-foreground"
                }
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-64">
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
              <span>System Initialization</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg, #7B5CFF, #1DE9B6)", width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
