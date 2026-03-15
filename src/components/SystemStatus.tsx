import { motion } from "framer-motion";

const statuses = [
  { label: "Knowledge Graph Nodes", value: "2.4M", active: true },
  { label: "Research Papers Indexed", value: "847K", active: true },
  { label: "Simulation Engine", value: "Active", active: true },
  { label: "Reasoning Models", value: "Online", active: true },
];

const SystemStatus = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="glass-panel rounded-xl p-4"
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2 rounded-full bg-lab-teal animate-pulse-glow" />
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
        AI Research System Status
      </span>
    </div>
    <div className="space-y-2">
      {statuses.map((s, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">{s.label}</span>
          <span className="font-mono text-[11px] text-lab-teal">{s.value}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default SystemStatus;
