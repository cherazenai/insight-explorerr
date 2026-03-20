import { motion } from "framer-motion";
import { X, Lock } from "lucide-react";
import { getAllInsights, getRarityColor, getRarityLabel } from "@/data/insights";

interface CollectionGridProps {
  collectedIds: string[];
  onClose: () => void;
}

const CollectionGrid = ({ collectedIds, onClose }: CollectionGridProps) => {
  const all = getAllInsights();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40 }}
        className="bg-card rounded-t-2xl md:rounded-2xl border border-border shadow-2xl w-full md:max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Discovery Archive</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{collectedIds.length} of {all.length} discovered</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center hover:bg-border transition-colors">
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-5 pt-4">
          <div className="h-[2px] rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(220 90% 56%), hsl(261 85% 60%))' }}
              initial={{ width: 0 }}
              animate={{ width: `${(collectedIds.length / all.length) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        <div className="p-5 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {all.map((insight) => {
              const collected = collectedIds.includes(insight.id);
              return (
                <div
                  key={insight.id}
                  className={`p-3 rounded-xl border transition-colors ${
                    collected ? "glass-card" : "bg-secondary/30 border-border/30"
                  }`}
                >
                  {collected ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ color: getRarityColor(insight.rarity), background: `${getRarityColor(insight.rarity)}15` }}
                        >
                          {getRarityLabel(insight.rarity)}
                        </span>
                        <span className="text-[9px] text-muted-foreground">{insight.confidence}%</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{insight.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{insight.category}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 opacity-40">
                      <Lock size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Undiscovered</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CollectionGrid;
