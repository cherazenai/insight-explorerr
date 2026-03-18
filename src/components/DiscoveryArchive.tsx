import { motion } from "framer-motion";

interface Discovery {
  id: number;
  title: string;
  description: string;
  domain: string;
  timestamp: string;
  confidence?: number;
}

interface DiscoveryArchiveProps {
  discoveries: Discovery[];
}

const DiscoveryArchive = ({ discoveries }: DiscoveryArchiveProps) => {
  if (discoveries.length === 0) return null;

  return (
    <div className="w-full">
      <p className="eyebrow mb-3">Recent Discoveries</p>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {discoveries.slice(0, 10).map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="card-surface p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{d.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                  {d.domain} · {d.confidence}% confidence
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0 font-mono">{d.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiscoveryArchive;
