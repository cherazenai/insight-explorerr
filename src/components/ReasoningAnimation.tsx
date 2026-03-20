import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Database, Brain, Lightbulb, Check } from "lucide-react";
import logoImg from "@/assets/logo.png";

const steps = [
  { label: "Initializing Neural Network", icon: Network },
  { label: "Parsing Scientific Database", icon: Database },
  { label: "Running Hypothesis Engine", icon: Brain },
  { label: "Classifying Discovery", icon: Lightbulb },
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
          setTimeout(onComplete, 700);
          return s;
        }
        return s + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6">
      {/* Sonar pulse background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full sonar-ping" style={{ border: '1px solid rgba(79,142,247,0.15)' }} />
        <div className="absolute w-[200px] h-[200px] rounded-full sonar-ping" style={{ border: '1px solid rgba(79,142,247,0.1)', animationDelay: '0.8s' }} />
      </div>

      {/* Logo orb */}
      <motion.div
        className="w-20 h-20 rounded-2xl overflow-hidden mb-10 blue-glow"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <img src={logoImg} alt="ApeironAI" className="w-full h-full object-contain" />
      </motion.div>

      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
        Reality Engine Processing...
      </h3>
      <p className="text-sm text-muted-foreground mb-10">Analyzing scientific knowledge space</p>

      {/* Steps */}
      <div className="w-full max-w-sm space-y-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === currentStep;
          const isDone = i < currentStep;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                isActive ? "glass-card border-primary/30" :
                isDone ? "bg-secondary/50" : "bg-secondary/20"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                isDone ? "bg-success/20" : isActive ? "bg-primary/15" : "bg-secondary"
              }`}>
                {isDone ? (
                  <Check size={16} className="text-success" />
                ) : (
                  <Icon size={16} className={isActive ? "text-primary" : "text-muted-foreground/50"} />
                )}
              </div>
              <span className={`text-sm font-medium ${
                isActive ? "text-foreground" : isDone ? "text-foreground/60" : "text-muted-foreground/40"
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

      {/* Progress bar */}
      <div className="mt-10 w-full max-w-sm h-[2px] rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, hsl(220 90% 56%), hsl(261 85% 60%))' }}
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Ambient floating text */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["Quantum Coherence", "Plasma Topology", "Neural Architecture", "Molecular Dynamics", "Spectral Analysis"].map((term, i) => (
          <motion.span
            key={term}
            className="absolute font-mono text-[10px] text-foreground/[0.04]"
            style={{ left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.02, 0.06, 0.02] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            {term}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default ReasoningAnimation;
