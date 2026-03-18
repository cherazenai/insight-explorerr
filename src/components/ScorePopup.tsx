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
  rare: "bg-rarity-rare/20 text-rarity-rare",
  common: "bg-rarity-common/20 text-rarity-common",
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
            className="flex items-center justify-center gap-1.5 mb-3"
          >
            <Sparkles size={14} className="text-destructive" />
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${rarityBg[insight.rarity] || rarityBg.common}`}>
              New {getRarityLabel(insight.rarity)} Discovery
            </span>
          </motion.div>
        )}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 1] }}
          transition={{ duration: 0.5, times: [0, 0.6, 1] }}
          className="text-6xl font-extrabold text-destructive"
          style={{ textShadow: '0 0 30px hsl(6 78% 57% / 0.5)' }}
        >
          +{points}
        </motion.div>
        <p className="text-xs text-muted-foreground mt-2 font-semibold uppercase tracking-widest">Research Points</p>
      </div>
    </motion.div>
  );
};

export default ScorePopup;
