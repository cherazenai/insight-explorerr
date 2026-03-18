import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Network, Brain, Lightbulb, Sparkles, Check } from "lucide-react";

const steps = [
  { label: "Collecting Research Data", icon: Database },
  { label: "Building Knowledge Graph", icon: Network },
  { label: "AI Reasoning Engine Processing", icon: Brain },
  { label: "Hypothesis Generation", icon: Lightbulb },
  { label: "Discovery Classification", icon: Sparkles },
];

interface ReasoningAnimationProps {
  onComplete: () => void;
}

const ReasoningAnimation = ({ onComplete }: ReasoningAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return s;
        }
        return s + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="text-center mb-8">
        <p className="eyebrow mb-2">⚡ ANALYZING</p>
        <h3 className="text-xl font-bold text-foreground">
          AI Processing...
        </h3>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === currentStep;
          const isDone = i < currentStep;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive ? "bg-primary/10 border border-primary/40" :
                isDone ? "bg-secondary border border-border" : "bg-secondary/50 border border-transparent"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isDone ? "bg-primary" : isActive ? "bg-primary/20" : "bg-secondary"
              }`}>
                {isDone ? (
                  <Check size={15} className="text-primary-foreground" />
                ) : (
                  <Icon size={15} className={isActive ? "text-destructive" : "text-muted-foreground"} />
                )}
              </div>
              <span className={`text-sm font-medium ${
                isActive ? "text-foreground" : isDone ? "text-foreground/70" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
              {isActive && (
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="ml-auto w-2 h-2 rounded-full bg-destructive"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 h-[3px] rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #C0392B, #E74C3C)' }}
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default ReasoningAnimation;
