import { motion } from "framer-motion";
import { getRarityColor, getRarityLabel, type InsightData } from "@/data/insights";
import { Sparkles } from "lucide-react";

interface ScorePopupProps {
  points: number;
  insight: InsightData;
  isNew: boolean;
  onDone: () => void;
}

const ScorePopup = ({ points, insight, isNew, onDone }: ScorePopupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      onAnimationComplete={() => setTimeout(onDone, 2000)}
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
    >
      <div className="text-center">
        {isNew && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-1.5 mb-2"
          >
            <Sparkles size={14} style={{ color: getRarityColor(insight.rarity) }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: getRarityColor(insight.rarity) }}>
              New {getRarityLabel(insight.rarity)} Discovery
            </span>
            <Sparkles size={14} style={{ color: getRarityColor(insight.rarity) }} />
          </motion.div>
        )}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.3, 1] }}
          transition={{ duration: 0.6, times: [0, 0.6, 1] }}
          className="font-mono text-4xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${getRarityColor(insight.rarity)}, #fff)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          +{points}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[10px] text-muted-foreground mt-1"
        >
          RESEARCH POINTS
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ScorePopup;
