import { motion, AnimatePresence } from "framer-motion";
import { getAllInsights, getRarityColor, getRarityLabel } from "@/data/insights";
import { Lock, CheckCircle2 } from "lucide-react";

interface CollectionGridProps {
  collectedIds: string[];
  onClose: () => void;
}

const CollectionGrid = ({ collectedIds, onClose }: CollectionGridProps) => {
  const all = getAllInsights();
  const categories = [...new Set(all.map((i) => i.category))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="glass-panel rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground">Discovery Collection</h3>
            <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase mt-1">
              {collectedIds.length} / {all.length} Discoveries Found
            </p>
          </div>
          <button onClick={onClose} className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
            [ESC]
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full mb-6" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #1DE9B6, #7B5CFF, #FF4DA6, #FFD700)",
              width: `${(collectedIds.length / all.length) * 100}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(collectedIds.length / all.length) * 100}%` }}
            transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
          />
        </div>

        {/* Rarity legend */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {["common", "rare", "epic", "legendary"].map((r) => (
            <div key={r} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: getRarityColor(r) }} />
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: getRarityColor(r) }}>
                {getRarityLabel(r)}
              </span>
            </div>
          ))}
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-6">
            <h4 className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground mb-3">{cat}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {all
                .filter((i) => i.category === cat)
                .map((insight) => {
                  const collected = collectedIds.includes(insight.id);
                  return (
                    <motion.div
                      key={insight.id}
                      whileHover={collected ? { scale: 1.03 } : undefined}
                      className="p-3 rounded-lg relative overflow-hidden"
                      style={{
                        background: collected ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                        boxShadow: collected
                          ? `0 0 0 1px ${getRarityColor(insight.rarity)}30`
                          : "0 0 0 1px rgba(255,255,255,0.04)",
                        opacity: collected ? 1 : 0.5,
                      }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span
                          className="font-mono text-[8px] tracking-wider uppercase"
                          style={{ color: getRarityColor(insight.rarity) }}
                        >
                          {getRarityLabel(insight.rarity)}
                        </span>
                        {collected ? (
                          <CheckCircle2 size={12} style={{ color: getRarityColor(insight.rarity) }} />
                        ) : (
                          <Lock size={12} className="text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-[11px] font-medium text-foreground/80 leading-tight">
                        {collected ? insight.title : "???"}
                      </p>
                      {collected && (
                        <p className="font-mono text-[9px] text-muted-foreground mt-1">+{insight.points} pts</p>
                      )}
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CollectionGrid;
