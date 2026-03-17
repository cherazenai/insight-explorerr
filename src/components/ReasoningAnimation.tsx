import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Network, Brain, Lightbulb, Sparkles, Check } from "lucide-react";

const steps = [
  { label: "Collecting Data", icon: Database },
  { label: "Analyzing Knowledge Graph", icon: Network },
  { label: "Running Reasoning Engine", icon: Brain },
  { label: "Generating Hypothesis", icon: Lightbulb },
  { label: "Classifying Discovery", icon: Sparkles },
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
    }, 700);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto py-8">
      <h3 className="text-lg font-semibold text-foreground text-center mb-6">
        AI Processing...
      </h3>
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
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive ? "bg-primary/10 border border-primary/30" :
                isDone ? "bg-secondary" : "bg-secondary/50"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isDone ? "bg-primary" : isActive ? "bg-primary/20" : "bg-secondary"
              }`}>
                {isDone ? (
                  <Check size={15} className="text-primary-foreground" />
                ) : (
                  <Icon size={15} className={isActive ? "text-primary" : "text-muted-foreground"} />
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
                  className="ml-auto w-2 h-2 rounded-full bg-primary"
                />
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 h-1 rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default ReasoningAnimation;
