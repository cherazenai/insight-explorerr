import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SelectionCardProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
  delay?: number;
  accentColor?: string;
}

const SelectionCard = ({ icon: Icon, label, selected, onClick, delay = 0, accentColor }: SelectionCardProps) => {
  const color = accentColor || (selected ? "#00ffd5" : undefined);

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.2, 0, 0, 1] }}
      onClick={onClick}
      className={`lab-card p-3 md:p-4 text-left w-full flex items-center gap-3 cursor-pointer ${selected ? "selected" : ""}`}
    >
      <div
        className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: selected
            ? `${color || "#00ffd5"}15`
            : "rgba(255,255,255,0.04)",
          boxShadow: selected ? `0 0 12px ${color || "#00ffd5"}30` : "none",
        }}
      >
        <Icon
          size={16}
          style={{ color: selected ? (color || "#00ffd5") : "rgba(255,255,255,0.45)" }}
        />
      </div>
      <span
        className="text-xs md:text-sm font-medium"
        style={{ color: selected ? "#fff" : "rgba(255,255,255,0.55)" }}
      >
        {label}
      </span>
    </motion.button>
  );
};

export default SelectionCard;
