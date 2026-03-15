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

    const s = size * 2; // retina
    canvas.width = s;
    canvas.height = s;

    const nodes: { angle: number; radius: number; speed: number; size: number }[] = [];
    for (let i = 0; i < 60; i++) {
      nodes.push({
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * 50,
        speed: (Math.random() - 0.5) * 0.008 * (active ? 3 : 1),
        size: Math.random() * 2 + 1,
      });
    }

    let animId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, s, s);
      const cx = s / 2;
      const cy = s / 2;
      time += 0.01;

      // Core glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, active ? 80 : 50);
      gradient.addColorStop(0, active ? "rgba(123,92,255,0.3)" : "rgba(123,92,255,0.15)");
      gradient.addColorStop(0.5, active ? "rgba(29,233,182,0.1)" : "rgba(123,92,255,0.05)");
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, active ? 80 : 50, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.angle += n.speed;
        const x = cx + Math.cos(n.angle + time) * n.radius;
        const y = cy + Math.sin(n.angle + time) * n.radius;

        ctx.beginPath();
        ctx.arc(x, y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? "#1DE9B6" : i % 3 === 1 ? "#7B5CFF" : "#FF4DA6";
        ctx.globalAlpha = active ? 0.8 : 0.4;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const x2 = cx + Math.cos(n2.angle + time) * n2.radius;
          const y2 = cy + Math.sin(n2.angle + time) * n2.radius;
          const d = Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);
          if (d < 40) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "#7B5CFF";
            ctx.globalAlpha = (1 - d / 40) * (active ? 0.4 : 0.15);
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
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
            background: "radial-gradient(circle, rgba(123,92,255,0.2) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
};

export default AICore;
