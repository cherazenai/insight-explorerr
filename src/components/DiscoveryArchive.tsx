import { motion } from "framer-motion";

interface Discovery {
  id: number;
  title: string;
  description: string;
  domain: string;
  timestamp: string;
  impact?: string;
  confidence?: number;
}

interface DiscoveryArchiveProps {
  discoveries: Discovery[];
}

const DiscoveryArchive = ({ discoveries }: DiscoveryArchiveProps) => {
  if (discoveries.length === 0) return null;

  return (
    <div>
      <h3 className="eyebrow mb-3">Recent Discoveries</h3>
      <div className="space-y-2">
        {discoveries.slice(0, 5).map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 font-mono text-xs text-primary font-bold">
              #{d.id}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{d.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{d.domain} · {d.confidence}% · {d.timestamp}</p>
            </div>
            {d.impact && (
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider shrink-0">{d.impact}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiscoveryArchive;
