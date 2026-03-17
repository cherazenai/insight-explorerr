import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio } from "lucide-react";

const feedTemplates = [
  { domain: "Materials Science", text: "detected a possible superconducting material composition", confidence: 63 },
  { domain: "Medicine", text: "identified a novel drug target binding site", confidence: 76 },
  { domain: "Energy Technology", text: "predicted a perovskite composition with enhanced stability", confidence: 87 },
  { domain: "Quantum Physics", text: "discovered a topological error correction code", confidence: 66 },
  { domain: "Climate Science", text: "mapped an unknown carbon sink mechanism", confidence: 69 },
  { domain: "Biotechnology", text: "optimized CRISPR guide RNA efficiency", confidence: 91 },
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
    <div className="card-elevated rounded-xl px-4 py-3 w-full">
      <div className="flex items-center gap-2 mb-1.5">
        <Radio size={12} className="text-primary" />
        <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">
          Live Discovery Feed
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-xs text-foreground/80">
            <span className="font-semibold text-foreground">{item.domain}:</span>{" "}
            ApeironAI {item.text}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Confidence: {item.confidence}%
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GlobalFeed;
