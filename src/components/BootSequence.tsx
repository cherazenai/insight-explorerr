import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "> APEIRON_OS v2.1.0", delay: 0 },
  { text: "> CONNECTING TO CHERAZEN KNOWLEDGE NETWORK... OK", delay: 350 },
  { text: "> LOADING SCIENTIFIC DATASETS [12.4M entries]... OK", delay: 700 },
  { text: "> INITIALIZING AI REASONING ENGINE... OK", delay: 1050 },
  { text: "> ACTIVATING HYPOTHESIS GENERATOR... OK", delay: 1400 },
  { text: "> SYNCHRONIZING SIMULATION ENGINE... OK", delay: 1750 },
  { text: "> MOUNTING KNOWLEDGE GRAPH [2.4M nodes]... OK", delay: 2100 },
  { text: "> SYSTEM READY.", delay: 2450 },
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
        return p + 1.8;
      });
    }, 50);

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800);
    }, 3400);

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
          style={{ backgroundColor: "#05060a", zIndex: 100 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-px animate-scan-line"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0,255,213,0.15), transparent)",
            }}
          />

          {/* Logo / Infinity symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mb-8 flex flex-col items-center"
          >
            {/* Infinity symbol */}
            <div className="relative w-16 h-8 mb-4">
              <svg viewBox="0 0 64 32" className="w-full h-full infinity-pulse">
                <path
                  d="M16 16c0-6 5-12 12-12s12 6 12 12-5 12-12 12c-3 0-6-1-8-3-2 2-5 3-8 3C5 28 0 22 0 16S5 4 12 4c3 0 6 1 8 3 2-2 5-3 8-3"
                  fill="none"
                  stroke="#00ffd5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  transform="translate(8, 0)"
                />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              ApeironAI
            </h1>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-1">
              Research Lab
            </p>
          </motion.div>

          {/* Boot text */}
          <div className="font-mono text-xs space-y-1.5 max-w-md px-6">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: i === bootLines.length - 1 ? "#00ffd5" : undefined,
                }}
                className={i !== bootLines.length - 1 ? "text-muted-foreground" : ""}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-64">
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
              <span>System Initialization</span>
              <span>{Math.min(Math.floor(progress), 100)}%</span>
            </div>
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full"
                style={{
                  background: "linear-gradient(90deg, #7a5cff, #00ffd5)",
                  width: `${Math.min(progress, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Version label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 font-mono text-[9px] text-muted-foreground tracking-wider"
          >
            Cherazen Research Systems · ApeironAI Research Lab v2.1
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
