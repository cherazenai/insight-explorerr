import { motion } from "framer-motion";
import { Trophy, Flame, Zap, Star, Battery } from "lucide-react";
import type { PlayerStats } from "@/data/insights";

interface GameHUDProps {
  stats: PlayerStats;
}

const GameHUD = ({ stats }: GameHUDProps) => {
  const xpPercent = Math.min((stats.xp / stats.xpToNext) * 100, 100);

  return (
    <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
      {/* Level */}
      <div className="flex items-center gap-1.5 bg-secondary rounded-lg px-2.5 py-1.5">
        <Trophy size={13} className="text-primary" />
        <span className="text-xs font-semibold text-foreground">Lvl {stats.level}</span>
        <div className="w-10 h-1 rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-primary"
            style={{ width: `${xpPercent}%` }}
            animate={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center gap-1.5 bg-secondary rounded-lg px-2.5 py-1.5">
        <Star size={13} className="text-primary" />
        <span className="text-xs font-semibold tabular-nums">{stats.score.toLocaleString()}</span>
      </div>

      {/* Energy */}
      <div className="flex items-center gap-1.5 bg-secondary rounded-lg px-2.5 py-1.5">
        <Battery size={13} className="text-muted-foreground" />
        <span className="text-xs tabular-nums text-muted-foreground">{stats.energy}/{stats.maxEnergy}</span>
      </div>

      {/* Streak */}
      {stats.streak > 0 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1 bg-primary/10 rounded-lg px-2.5 py-1.5"
        >
          <Flame size={13} className="text-primary" />
          <span className="text-xs font-semibold text-primary">×{stats.streak}</span>
        </motion.div>
      )}

      {/* Discoveries */}
      <div className="hidden sm:flex items-center gap-1.5 bg-secondary rounded-lg px-2.5 py-1.5">
        <Zap size={13} className="text-muted-foreground" />
        <span className="text-xs tabular-nums text-muted-foreground">{stats.collectedInsights.length}/48</span>
      </div>
    </div>
  );
};

export default GameHUD;
