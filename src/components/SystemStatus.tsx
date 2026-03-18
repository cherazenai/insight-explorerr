import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

const SystemStatus = () => {
  const [counter, setCounter] = useState(1284223);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-surface px-4 py-3 w-full">
      <div className="flex items-center gap-2 mb-2">
        <Activity size={12} className="text-destructive" />
        <span className="eyebrow" style={{ fontSize: '10px', letterSpacing: '2px' }}>
          System Status
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
          <span className="text-[10px] text-success font-semibold font-mono">ONLINE</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Discoveries", value: counter.toLocaleString() },
          { label: "Papers Indexed", value: "12.4M" },
          { label: "Graph Nodes", value: "2.4M" },
          { label: "Models Active", value: "7" },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
            <p className="text-xs font-bold text-foreground font-mono tabular-nums">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;
