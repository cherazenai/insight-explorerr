import { motion } from "framer-motion";
import { Trophy, Flame, Zap, Star, Battery, Shield } from "lucide-react";
import type { PlayerStats } from "@/data/insights";

interface GameHUDProps {
  stats: PlayerStats;
  showCombo?: number;
}

const GameHUD = ({ stats, showCombo }: GameHUDProps) => {
  const xpPercent = Math.min((stats.xp / stats.xpToNext) * 100, 100);

  return (
    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
      {/* Score */}
      <div className="glass-panel rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 flex items-center gap-2">
        <Star size={13} className="text-ap-gold" />
        <div>
          <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Score</p>
          <p className="font-mono text-xs md:text-sm text-foreground tabular-nums">{stats.score.toLocaleString()}</p>
        </div>
      </div>

      {/* Level + XP */}
      <div className="glass-panel rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 flex items-center gap-2">
        <Trophy size={13} className="text-ap-cyan" />
        <div>
          <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Lvl {stats.level}</p>
          <div className="w-14 md:w-20 h-1 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #7a5cff, #00ffd5)", width: `${xpPercent}%` }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Energy */}
      <div className="glass-panel rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 flex items-center gap-2">
        <Battery size={13} className="text-ap-blue" />
        <div>
          <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Energy</p>
          <p className="font-mono text-xs md:text-sm tabular-nums text-ap-blue">
            {stats.energy}/{stats.maxEnergy}
          </p>
        </div>
      </div>

      {/* Streak */}
      {stats.streak > 0 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 flex items-center gap-2"
          style={{
            boxShadow: stats.streak >= 3
              ? "0 0 0 1px rgba(255,209,102,0.3), 0 0 16px rgba(255,209,102,0.12)"
              : undefined,
          }}
        >
          <Flame size={13} style={{ color: stats.streak >= 5 ? "#ffd166" : stats.streak >= 3 ? "#FF4DA6" : "#7a5cff" }} />
          <div>
            <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Streak</p>
            <p className="font-mono text-xs md:text-sm tabular-nums" style={{ color: stats.streak >= 5 ? "#ffd166" : stats.streak >= 3 ? "#FF4DA6" : "#7a5cff" }}>
              ×{stats.streak}
            </p>
          </div>
        </motion.div>
      )}

      {/* Discoveries - hidden on very small screens */}
      <div className="glass-panel rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 hidden sm:flex items-center gap-2">
        <Zap size={13} className="text-ap-cyan" />
        <div>
          <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Found</p>
          <p className="font-mono text-xs md:text-sm text-foreground tabular-nums">
            {stats.collectedInsights.length}/{48}
          </p>
        </div>
      </div>

      {/* Rank - desktop only */}
      <div className="glass-panel rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 hidden lg:flex items-center gap-2">
        <Shield size={13} className="text-ap-purple" />
        <div>
          <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Rank</p>
          <p className="font-mono text-[10px] md:text-xs text-ap-purple truncate max-w-[80px]">{stats.rank}</p>
        </div>
      </div>

      {/* Combo popup */}
      {showCombo && showCombo > 0 && (
        <motion.div
          key={showCombo}
          initial={{ scale: 1.5, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="font-mono text-base md:text-lg font-bold text-ap-gold"
        >
          +{showCombo}
        </motion.div>
      )}
    </div>
  );
};

export default GameHUD;
