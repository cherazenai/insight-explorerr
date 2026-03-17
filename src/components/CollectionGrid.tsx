import { motion, AnimatePresence } from "framer-motion";
import { getAllInsights, getRarityLabel } from "@/data/insights";
import { Lock, CheckCircle2, X } from "lucide-react";

interface CollectionGridProps {
  collectedIds: string[];
  onClose: () => void;
}

const rarityStyles: Record<string, { bg: string; text: string; border: string }> = {
  mythic: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  legendary: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  epic: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  rare: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  common: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
};

const CollectionGrid = ({ collectedIds, onClose }: CollectionGridProps) => {
  const all = getAllInsights();
  const categories = [...new Set(all.map((i) => i.category))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-foreground/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-background rounded-2xl border border-border shadow-xl p-4 md:p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 md:mb-5">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Discovery Archive</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {collectedIds.length} / {all.length} discoveries catalogued
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors">
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Progress */}
        <div className="h-1.5 rounded-full bg-secondary mb-5">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(collectedIds.length / all.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Rarity legend */}
        <div className="flex gap-3 mb-5 flex-wrap">
          {["common", "rare", "epic", "legendary", "mythic"].map((r) => {
            const style = rarityStyles[r];
            return (
              <span key={r} className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                {getRarityLabel(r)}
              </span>
            );
          })}
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{cat}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {all.filter((i) => i.category === cat).map((insight) => {
                const collected = collectedIds.includes(insight.id);
                const style = rarityStyles[insight.rarity] || rarityStyles.common;
                return (
                  <div
                    key={insight.id}
                    className={`p-2.5 rounded-xl border transition-all ${
                      collected ? `${style.bg} ${style.border}` : "bg-secondary/50 border-border opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[9px] font-semibold uppercase tracking-wider ${collected ? style.text : "text-muted-foreground"}`}>
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
                      <p className="text-[9px] text-muted-foreground mt-1">
                        +{insight.points} pts · {insight.confidence}%
                      </p>
                    )}
                  </div>
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
