import { motion } from "framer-motion";
import { getRarityColor, getRarityLabel, getImpactColor, type InsightData } from "@/data/insights";
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
      onAnimationComplete={() => setTimeout(onDone, 2200)}
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
    >
      <div className="text-center">
        {/* Expanding ring effect */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="w-20 h-20 rounded-full"
            style={{
              border: `2px solid ${getRarityColor(insight.rarity)}`,
              boxShadow: `0 0 30px ${getRarityColor(insight.rarity)}40`,
            }}
          />
        </motion.div>

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
          className="font-mono text-4xl md:text-5xl font-bold"
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 flex items-center justify-center gap-2"
        >
          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full" style={{
            background: `${getImpactColor(insight.impact)}15`,
            color: getImpactColor(insight.impact),
            border: `1px solid ${getImpactColor(insight.impact)}30`,
          }}>
            {insight.impact}
          </span>
          <span className="font-mono text-[9px] text-muted-foreground">
            {insight.confidence}% confidence
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScorePopup;
