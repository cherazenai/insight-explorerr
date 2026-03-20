import { motion } from "framer-motion";
import { Lock, Check, type LucideIcon } from "lucide-react";

interface SelectionCardProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  selected: boolean;
  locked?: boolean;
  unlockLevel?: number;
  onClick: () => void;
  delay?: number;
}

const SelectionCard = ({ icon: Icon, label, description, selected, locked, unlockLevel, onClick, delay = 0 }: SelectionCardProps) => {
  if (locked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 0.3, delay }}
        className="p-4 flex items-center gap-4 cursor-not-allowed rounded-2xl border border-border/50 bg-card/30"
      >
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
          <Lock size={16} className="text-muted-foreground/50" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground/60">{label}</p>
          <p className="text-[11px] text-muted-foreground/40 mt-0.5">Unlocks at Rank {unlockLevel}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`w-full text-left p-4 flex items-center gap-4 transition-all duration-200 rounded-2xl ${
        selected ? "card-selected" : "glass-card"
      }`}
      style={{ minHeight: 64 }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
        selected ? "bg-primary/15" : "bg-secondary"
      }`}>
        <Icon size={20} className={selected ? "text-primary" : "text-muted-foreground"} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-[15px] font-semibold ${selected ? "text-foreground" : "text-foreground/80"}`}>{label}</p>
        {description && (
          <p className="text-[12px] text-muted-foreground leading-tight mt-0.5">{description}</p>
        )}
      </div>
      {selected && (
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
          <Check size={14} className="text-primary-foreground" />
        </div>
      )}
    </motion.button>
  );
};

export default SelectionCard;
