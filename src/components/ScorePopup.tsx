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
  mythic: "bg-emerald-50 text-emerald-700",
  legendary: "bg-amber-50 text-amber-700",
  epic: "bg-pink-50 text-pink-700",
  rare: "bg-violet-50 text-violet-700",
  common: "bg-sky-50 text-sky-700",
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
            className="flex items-center justify-center gap-1.5 mb-2"
          >
            <Sparkles size={14} className="text-primary" />
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rarityBg[insight.rarity] || rarityBg.common}`}>
              New {getRarityLabel(insight.rarity)} Discovery
            </span>
          </motion.div>
        )}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 1] }}
          transition={{ duration: 0.5, times: [0, 0.6, 1] }}
          className="text-5xl font-bold text-primary"
        >
          +{points}
        </motion.div>
        <p className="text-xs text-muted-foreground mt-1 font-medium">Research Points</p>
      </div>
    </motion.div>
  );
};

export default ScorePopup;
