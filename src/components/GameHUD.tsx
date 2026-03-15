import { motion } from "framer-motion";
import { Trophy, Flame, Zap, Star } from "lucide-react";
import type { PlayerStats } from "@/data/insights";

interface GameHUDProps {
  stats: PlayerStats;
  showCombo?: number;
}

const GameHUD = ({ stats, showCombo }: GameHUDProps) => {
  const xpPercent = Math.min((stats.xp / stats.xpToNext) * 100, 100);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Score */}
      <div className="glass-panel rounded-lg px-3 py-2 flex items-center gap-2">
        <Star size={14} className="text-lab-violet" />
        <div>
          <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">Score</p>
          <p className="font-mono text-sm text-foreground tabular-nums">{stats.score.toLocaleString()}</p>
        </div>
      </div>

      {/* Level + XP */}
      <div className="glass-panel rounded-lg px-3 py-2 flex items-center gap-2">
        <Trophy size={14} className="text-lab-teal" />
        <div>
          <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">Level {stats.level}</p>
          <div className="w-20 h-1 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #7B5CFF, #1DE9B6)", width: `${xpPercent}%` }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Streak */}
      {stats.streak > 0 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel rounded-lg px-3 py-2 flex items-center gap-2"
          style={{
            boxShadow: stats.streak >= 3
              ? "0 0 0 1px rgba(255,77,166,0.3), 0 0 16px rgba(255,77,166,0.15)"
              : undefined,
          }}
        >
          <Flame size={14} style={{ color: stats.streak >= 5 ? "#FFD700" : stats.streak >= 3 ? "#FF4DA6" : "#7B5CFF" }} />
          <div>
            <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">Streak</p>
            <p className="font-mono text-sm tabular-nums" style={{ color: stats.streak >= 5 ? "#FFD700" : stats.streak >= 3 ? "#FF4DA6" : "#7B5CFF" }}>
              ×{stats.streak}
            </p>
          </div>
        </motion.div>
      )}

      {/* Discoveries */}
      <div className="glass-panel rounded-lg px-3 py-2 flex items-center gap-2">
        <Zap size={14} className="text-lab-teal" />
        <div>
          <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">Discoveries</p>
          <p className="font-mono text-sm text-foreground tabular-nums">
            {stats.collectedInsights.length}/{24}
          </p>
        </div>
      </div>

      {/* Combo popup */}
      {showCombo && showCombo > 0 && (
        <motion.div
          key={showCombo}
          initial={{ scale: 1.5, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="font-mono text-lg font-bold"
          style={{ color: "#FFD700" }}
        >
          +{showCombo}
        </motion.div>
      )}
    </div>
  );
};

export default GameHUD;
