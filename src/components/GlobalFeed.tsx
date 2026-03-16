import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const feedTemplates = [
  { domain: "Materials Science", text: "detected a possible superconducting material composition", confidence: 63 },
  { domain: "Medicine", text: "identified a novel drug target binding site", confidence: 76 },
  { domain: "Energy Technology", text: "predicted a perovskite composition with enhanced stability", confidence: 87 },
  { domain: "Quantum Physics", text: "discovered a topological error correction code", confidence: 66 },
  { domain: "Climate Science", text: "mapped an unknown carbon sink mechanism", confidence: 69 },
  { domain: "Biotechnology", text: "optimized CRISPR guide RNA efficiency", confidence: 91 },
  { domain: "Artificial Intelligence", text: "found emergent reasoning patterns in attention heads", confidence: 61 },
  { domain: "Neuroscience", text: "identified a neural plasticity predictor", confidence: 74 },
  { domain: "Astrophysics", text: "detected anomalies in cosmic microwave background", confidence: 53 },
  { domain: "Nanotechnology", text: "designed a molecular motor with high efficiency", confidence: 59 },
  { domain: "Chemistry", text: "found a catalytic pathway for hydrogen production", confidence: 78 },
  { domain: "Aerospace", text: "optimized thermal shield material composition", confidence: 71 },
];

const GlobalFeed = () => {
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((c) => (c + 1) % feedTemplates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const item = feedTemplates[currentItem];

  return (
    <div className="glass-panel rounded-lg px-3 py-2 w-full max-w-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-ap-cyan animate-pulse-glow" />
        <span className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-muted-foreground">
          Live Discovery Feed
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[10px] md:text-[11px] text-foreground/75">
            <span className="text-ap-violet font-medium">{item.domain}:</span>{" "}
            ApeironAI {item.text}
          </p>
          <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground mt-0.5">
            Confidence: {item.confidence}%
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GlobalFeed;
