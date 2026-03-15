import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const stages = [
  { label: "Data Sources", color: "#1DE9B6" },
  { label: "Knowledge Graph", color: "#7B5CFF" },
  { label: "Reasoning Engine", color: "#7B5CFF" },
  { label: "Hypothesis Generator", color: "#FF4DA6" },
  { label: "Simulation Engine", color: "#1DE9B6" },
];

interface ReasoningAnimationProps {
  onComplete: () => void;
}

const ReasoningAnimation = ({ onComplete }: ReasoningAnimationProps) => {
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    stages.forEach((_, i) => {
      setTimeout(() => setActiveStage(i), 600 * (i + 1));
    });
    setTimeout(onComplete, 600 * (stages.length + 1));
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-3 py-8"
    >
      <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-4">
        AI Reasoning Pipeline Active
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: activeStage >= i ? 1 : 0.8,
                opacity: activeStage >= i ? 1 : 0.3,
              }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
              className="flex flex-col items-center gap-1"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs"
                style={{
                  background:
                    activeStage >= i
                      ? `${stage.color}20`
                      : "rgba(255,255,255,0.05)",
                  boxShadow:
                    activeStage >= i
                      ? `0 0 16px ${stage.color}40`
                      : "none",
                  color: activeStage >= i ? stage.color : "rgba(255,255,255,0.3)",
                  border: `1px solid ${activeStage >= i ? stage.color + "40" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {i + 1}
              </div>
              <span
                className="text-[10px] font-mono whitespace-nowrap"
                style={{
                  color: activeStage >= i ? stage.color : "rgba(255,255,255,0.3)",
                }}
              >
                {stage.label}
              </span>
            </motion.div>
            {i < stages.length - 1 && (
              <motion.div
                animate={{
                  scaleX: activeStage > i ? 1 : 0,
                  opacity: activeStage > i ? 0.6 : 0.1,
                }}
                transition={{ duration: 0.3 }}
                className="hidden sm:block w-8 h-px origin-left"
                style={{
                  background: `linear-gradient(90deg, ${stage.color}, ${stages[i + 1].color})`,
                }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Particle stream effect */}
      <div className="mt-6 relative h-1 w-64 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent, #7B5CFF, transparent)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default ReasoningAnimation;
