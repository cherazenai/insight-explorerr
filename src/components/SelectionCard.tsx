import { motion } from "framer-motion";
import { Lock, type LucideIcon } from "lucide-react";

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
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 0.3, delay }}
        className="card-elevated p-3.5 flex items-center gap-3 cursor-not-allowed opacity-50"
      >
        <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
          <Lock size={15} className="text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-[11px] text-muted-foreground">Unlocks at Level {unlockLevel}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-3.5 flex items-center gap-3 transition-all duration-200 ${
        selected ? "card-selected" : "card-elevated"
      }`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
        selected ? "bg-primary" : "bg-secondary"
      }`}>
        <Icon size={17} className={selected ? "text-primary-foreground" : "text-muted-foreground"} />
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-medium ${selected ? "text-foreground" : "text-foreground/80"}`}>{label}</p>
        {description && (
          <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{description}</p>
        )}
      </div>
    </motion.button>
  );
};

export default SelectionCard;
