import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SelectionCardProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
  delay?: number;
}

const SelectionCard = ({ icon: Icon, label, selected, onClick, delay = 0 }: SelectionCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.2, 0, 0, 1] }}
      onClick={onClick}
      className={`lab-card p-4 text-left w-full flex items-center gap-3 cursor-pointer ${selected ? "selected" : ""}`}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: selected
            ? "rgba(123,92,255,0.2)"
            : "rgba(255,255,255,0.05)",
          boxShadow: selected ? "0 0 12px rgba(123,92,255,0.3)" : "none",
        }}
      >
        <Icon
          size={18}
          style={{ color: selected ? "#7B5CFF" : "rgba(255,255,255,0.5)" }}
        />
      </div>
      <span
        className="text-sm font-medium"
        style={{ color: selected ? "#fff" : "rgba(255,255,255,0.6)" }}
      >
        {label}
      </span>
    </motion.button>
  );
};

export default SelectionCard;
