import { motion } from "framer-motion";
import { Activity, Database, Cpu, Network } from "lucide-react";

const items = [
  { icon: Database, label: "Knowledge Nodes", value: "2.4M", color: "text-primary" },
  { icon: Network, label: "Papers Indexed", value: "847K", color: "text-rarity-epic" },
  { icon: Cpu, label: "Reasoning Engine", value: "Online", color: "text-success" },
  { icon: Activity, label: "System Load", value: "12%", color: "text-muted-foreground" },
];

const SystemStatus = () => (
  <div className="glass-card p-5">
    <div className="flex items-center gap-2 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
      <span className="eyebrow" style={{ fontSize: '10px' }}>System Status</span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-2.5"
        >
          <item.icon size={14} className={item.color} />
          <div>
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
            <p className={`text-xs font-semibold font-mono ${item.color}`}>{item.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default SystemStatus;
