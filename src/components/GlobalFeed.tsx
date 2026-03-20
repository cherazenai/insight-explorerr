import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

const feedItems = [
  { domain: "Materials Science", text: "Possible superconducting material detected", confidence: 63 },
  { domain: "Medicine", text: "Novel biomarker panel identified for early cancer detection", confidence: 91 },
  { domain: "Energy Technology", text: "Perovskite composition with improved stability predicted", confidence: 87 },
  { domain: "Chemistry", text: "3-step synthesis pathway replacing 7-step process found", confidence: 85 },
  { domain: "Quantum Physics", text: "Topological error correction code reduces qubit overhead", confidence: 66 },
  { domain: "Biotechnology", text: "CRISPR guide RNA with 99% on-target efficiency predicted", confidence: 91 },
  { domain: "Astrophysics", text: "17 potentially habitable exoplanets identified", confidence: 64 },
  { domain: "Climate Science", text: "Unknown carbon sink in deep Atlantic currents detected", confidence: 69 },
];

const GlobalFeed = () => {
  const [idx, setIdx] = useState(0);
  const [count, setCount] = useState(1284223);

  useEffect(() => {
    const t1 = setInterval(() => setIdx((i) => (i + 1) % feedItems.length), 4000);
    const t2 = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 3) + 1), 2000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const item = feedItems[idx];

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-warning" />
          <span className="eyebrow" style={{ fontSize: '10px' }}>Global Feed</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono tabular-nums">{count.toLocaleString()} discoveries</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-[10px] text-primary font-mono mb-1">{item.domain}</p>
          <p className="text-sm text-foreground/80 leading-snug">{item.text}</p>
          <p className="text-[10px] text-muted-foreground font-mono mt-1.5">Confidence: {item.confidence}%</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GlobalFeed;
