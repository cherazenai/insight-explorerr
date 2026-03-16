import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AICoreProps {
  active?: boolean;
  size?: number;
}

const AICore = ({ active = false, size = 200 }: AICoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = size * 2;
    canvas.width = s;
    canvas.height = s;

    const nodes: { angle: number; radius: number; speed: number; size: number; layer: number }[] = [];
    for (let i = 0; i < 80; i++) {
      const layer = Math.floor(Math.random() * 3);
      nodes.push({
        angle: Math.random() * Math.PI * 2,
        radius: 20 + layer * 20 + Math.random() * 15,
        speed: (Math.random() - 0.5) * 0.006 * (active ? 3 : 1) * (layer === 0 ? 1.5 : 1),
        size: Math.random() * 2 + 0.8,
        layer,
      });
    }

    const colors = ["#00ffd5", "#7a5cff", "#4cc9ff", "#9f6bff", "#ffd166"];
    let animId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, s, s);
      const cx = s / 2;
      const cy = s / 2;
      time += 0.008;

      // Core glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, active ? 90 : 55);
      gradient.addColorStop(0, active ? "rgba(0,255,213,0.25)" : "rgba(122,92,255,0.12)");
      gradient.addColorStop(0.4, active ? "rgba(122,92,255,0.1)" : "rgba(122,92,255,0.04)");
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, active ? 90 : 55, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Alchemy circle rings
      for (let ring = 0; ring < 3; ring++) {
        const r = 30 + ring * 25;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = ring === 0 ? "#00ffd5" : "#7a5cff";
        ctx.globalAlpha = active ? 0.12 : 0.05;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.angle += n.speed;
        const x = cx + Math.cos(n.angle + time) * n.radius;
        const y = cy + Math.sin(n.angle + time) * n.radius;

        ctx.beginPath();
        ctx.arc(x, y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = active ? 0.7 : 0.35;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const x2 = cx + Math.cos(n2.angle + time) * n2.radius;
          const y2 = cy + Math.sin(n2.angle + time) * n2.radius;
          const d = Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);
          if (d < 35) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = colors[i % colors.length];
            ctx.globalAlpha = (1 - d / 35) * (active ? 0.35 : 0.12);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, [active, size]);

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="absolute inset-0"
      />
      {active && (
        <div
          className="absolute inset-0 rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(0,255,213,0.15) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
};

export default AICore;
