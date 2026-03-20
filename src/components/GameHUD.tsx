import { motion } from "framer-motion";
import { Trophy, Star, Gem } from "lucide-react";
import type { PlayerStats } from "@/data/insights";

interface GameHUDProps {
  stats: PlayerStats;
}

const GameHUD = ({ stats }: GameHUDProps) => {
  const xpPercent = Math.min((stats.xp / stats.xpToNext) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      {/* Level pill */}
      <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-1.5">
        <Trophy size={14} className="text-primary" />
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-foreground font-mono leading-tight">Lvl {stats.level}</span>
          <span className="text-[9px] text-muted-foreground leading-tight hidden sm:block">{stats.rank}</span>
        </div>
        <div className="w-12 h-1.5 rounded-full bg-background/50 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${xpPercent}%`, background: 'linear-gradient(90deg, hsl(220 90% 56%), hsl(261 85% 60%))' }}
            animate={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center gap-1.5 bg-secondary rounded-xl px-3 py-1.5">
        <Star size={14} className="text-warning" />
        <span className="text-xs font-semibold font-mono tabular-nums text-foreground">{stats.score.toLocaleString()}</span>
      </div>

      {/* Discoveries */}
      <div className="hidden sm:flex items-center gap-1.5 bg-secondary rounded-xl px-3 py-1.5">
        <Gem size={14} className="text-rarity-epic" />
        <span className="text-xs font-mono tabular-nums text-muted-foreground">{stats.collectedInsights.length}/48</span>
      </div>
    </div>
  );
};

export default GameHUD;
