import { motion } from "framer-motion";
import { getRarityLabel, type InsightData } from "@/data/insights";
import { Sparkles } from "lucide-react";

interface ScorePopupProps {
  points: number;
  insight: InsightData;
  isNew: boolean;
  onDone: () => void;
}

const rarityBg: Record<string, string> = {
  mythic: "bg-destructive/20 text-destructive",
  legendary: "bg-warning/20 text-warning",
  epic: "bg-rarity-epic/20 text-rarity-epic",
  rare: "bg-primary/20 text-primary",
  common: "bg-muted/30 text-muted-foreground",
};

const ScorePopup = ({ points, insight, isNew, onDone }: ScorePopupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={() => setTimeout(onDone, 1800)}
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
    >
      <div className="text-center">
        {isNew && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-1.5 mb-4"
          >
            <Sparkles size={14} className="text-primary" />
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${rarityBg[insight.rarity] || rarityBg.common}`}>
              New {getRarityLabel(insight.rarity)} Discovery
            </span>
          </motion.div>
        )}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 1] }}
          transition={{ duration: 0.5, times: [0, 0.6, 1] }}
          className="font-display text-7xl font-extrabold text-primary"
          style={{ textShadow: '0 0 40px rgba(79,142,247,0.4)' }}
        >
          +{points}
        </motion.div>
        <p className="text-xs text-muted-foreground mt-3 font-semibold uppercase tracking-widest font-mono">Research Points</p>
      </div>
    </motion.div>
  );
};

export default ScorePopup;
