import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2.5;
      });
    }, 40);

    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 600);
    }, 2200);

    return () => { clearInterval(interval); clearTimeout(exitTimer); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              ApeironAI Research Lab
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Initializing research systems...
            </p>
          </motion.div>

          <div className="mt-8 w-48">
            <div className="h-1 w-full rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              {Math.min(Math.floor(progress), 100)}%
            </p>
          </div>

          <p className="absolute bottom-6 text-[10px] text-muted-foreground">
            Powered by Cherazen Research Systems
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
