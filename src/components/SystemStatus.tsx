import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SystemStatus = () => {
  const [globalCount, setGlobalCount] = useState(1284223);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-panel rounded-xl p-4 w-full max-w-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-ap-cyan animate-pulse-glow" />
        <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-muted-foreground">
          ApeironAI System Status
        </span>
      </div>
      <div className="space-y-2">
        {[
          { label: "Knowledge Graph Nodes", value: "2.4M", color: "#00ffd5" },
          { label: "Research Papers Indexed", value: "847K", color: "#7a5cff" },
          { label: "Simulation Engine", value: "Active", color: "#00ffd5" },
          { label: "Reasoning Models", value: "Online", color: "#4cc9ff" },
        ].map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-[10px] md:text-[11px] text-muted-foreground">{s.label}</span>
            <span className="font-mono text-[10px] md:text-[11px]" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
        <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] md:text-[11px] text-muted-foreground">Global Discoveries</span>
            <motion.span
              key={globalCount}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[10px] md:text-[11px] text-ap-gold tabular-nums"
            >
              {globalCount.toLocaleString()}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemStatus;
