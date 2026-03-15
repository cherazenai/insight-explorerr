import { motion, AnimatePresence } from "framer-motion";

interface Discovery {
  id: number;
  title: string;
  description: string;
  domain: string;
  timestamp: string;
}

interface DiscoveryArchiveProps {
  discoveries: Discovery[];
}

const DiscoveryArchive = ({ discoveries }: DiscoveryArchiveProps) => {
  if (discoveries.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className="glass-panel rounded-xl p-4 w-full max-w-xs"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-lab-teal animate-pulse-glow" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
          Discovery Archive
        </span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(123,92,255,0.3) transparent" }}>
        <AnimatePresence mode="popLayout">
          {discoveries.map((d) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-2.5 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.03)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] text-lab-violet">
                  #{String(d.id).padStart(3, "0")}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  {d.timestamp}
                </span>
              </div>
              <p className="text-xs font-medium mt-1 text-foreground/80">{d.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{d.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DiscoveryArchive;
