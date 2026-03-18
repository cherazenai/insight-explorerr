import { motion, AnimatePresence } from "framer-motion";
import { getAllInsights, getRarityLabel } from "@/data/insights";
import { Lock, CheckCircle2, X } from "lucide-react";

interface CollectionGridProps {
  collectedIds: string[];
  onClose: () => void;
}

const rarityStyles: Record<string, { bg: string; text: string; border: string }> = {
  mythic: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/30" },
  legendary: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
  epic: { bg: "bg-rarity-epic/10", text: "text-rarity-epic", border: "border-rarity-epic/30" },
  rare: { bg: "bg-rarity-rare/10", text: "text-rarity-rare", border: "border-rarity-rare/30" },
  common: { bg: "bg-rarity-common/10", text: "text-rarity-common", border: "border-rarity-common/30" },
};

const CollectionGrid = ({ collectedIds, onClose }: CollectionGridProps) => {
  const all = getAllInsights();
  const categories = [...new Set(all.map((i) => i.category))];

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
        exit={{ y: 40, opacity: 0 }}
        className="bg-popover rounded-t-2xl md:rounded-2xl border border-border shadow-2xl p-4 md:p-6 w-full md:max-w-3xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 md:mb-5">
          <div>
            <p className="eyebrow mb-1">Archive</p>
            <h3 className="text-lg font-bold text-foreground">Discovery Archive</h3>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono">
              {collectedIds.length} / {all.length} discoveries catalogued
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors">
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Progress */}
        <div className="h-[3px] rounded-full bg-secondary mb-5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #C0392B, #E74C3C)' }}
            initial={{ width: 0 }}
            animate={{ width: `${(collectedIds.length / all.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Rarity legend */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {["common", "rare", "epic", "legendary", "mythic"].map((r) => {
            const style = rarityStyles[r];
            return (
              <span key={r} className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
                {getRarityLabel(r)}
              </span>
            );
          })}
        </div>

        {categories.map((cat, ci) => (
          <div key={cat} className="mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{cat}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {all.filter((i) => i.category === cat).map((insight, ii) => {
                const collected = collectedIds.includes(insight.id);
                const style = rarityStyles[insight.rarity] || rarityStyles.common;
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.05 + ii * 0.03 }}
                    className={`p-2.5 rounded-xl border transition-all ${
                      collected ? `${style.bg} ${style.border}` : "bg-secondary/30 border-border opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${collected ? style.text : "text-muted-foreground"}`}>
                        {getRarityLabel(insight.rarity)}
                      </span>
                      {collected ? (
                        <CheckCircle2 size={12} className={style.text} />
                      ) : (
                        <Lock size={12} className="text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-foreground/80 leading-tight">
                      {collected ? insight.title : "???"}
                    </p>
                    {collected && (
                      <p className="text-[9px] text-muted-foreground mt-1 font-mono">
                        +{insight.points} pts · {insight.confidence}%
                      </p>
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
