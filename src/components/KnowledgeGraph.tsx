import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface KGNode {
  id: string;
  label: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  connections: number[];
}

interface KnowledgeGraphProps {
  domain: string;
  method: string;
}

const graphData: Record<string, string[]> = {
  "Materials Science": ["Molecular Structures", "Crystal Lattices", "Polymer Chains", "Alloy Compositions", "Nanomaterials"],
  "Energy Technology": ["Solar Cells", "Battery Chemistry", "Hydrogen Production", "Grid Storage", "Fuel Cells"],
  "Chemistry": ["Catalytic Reactions", "Organic Synthesis", "Chemical Bonds", "Reaction Kinetics", "Molecular Dynamics"],
  "Medicine": ["Drug Targets", "Protein Folding", "Gene Expression", "Clinical Trials", "Biomarkers"],
  "Climate Science": ["Carbon Capture", "Ocean Currents", "Atmospheric Models", "Ice Core Data", "Climate Feedback"],
  "Aerospace": ["Material Stress", "Propulsion Systems", "Aerodynamics", "Orbital Mechanics", "Heat Shields"],
};

const KnowledgeGraph = ({ domain, method }: KnowledgeGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<KGNode | null>(null);
  const nodesRef = useRef<KGNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 500;
    const h = 300;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);

    const concepts = graphData[domain] || graphData["Chemistry"];
    const allLabels = [domain, method, ...concepts];
    const colors = ["#7B5CFF", "#1DE9B6", "#FF4DA6"];

    const nodes: KGNode[] = allLabels.map((label, i) => {
      const angle = (i / allLabels.length) * Math.PI * 2;
      const radius = i < 2 ? 60 : 110 + Math.random() * 20;
      return {
        id: `n${i}`,
        label,
        x: w / 2,
        y: h / 2,
        targetX: w / 2 + Math.cos(angle) * radius,
        targetY: h / 2 + Math.sin(angle) * radius,
        color: colors[i % colors.length],
        connections: i < 2 ? concepts.map((_, j) => j + 2) : [0, 1],
      };
    });
    nodesRef.current = nodes;

    let animId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.02;
      const progress = Math.min(time / 2, 1);

      for (const n of nodes) {
        n.x += (n.targetX - n.x) * 0.04;
        n.y += (n.targetY - n.y) * 0.04;
        // Slow drift
        n.targetX += Math.sin(time + parseInt(n.id.slice(1)) * 0.5) * 0.1;
        n.targetY += Math.cos(time + parseInt(n.id.slice(1)) * 0.7) * 0.1;
      }

      // Connections
      for (const n of nodes) {
        for (const ci of n.connections) {
          if (ci >= nodes.length) continue;
          const target = nodes[ci];
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = n.color;
          ctx.globalAlpha = 0.15 * progress;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Pulse along the line
          const pulsePos = (time * 0.5 + parseInt(n.id.slice(1)) * 0.3) % 1;
          const px = n.x + (target.x - n.x) * pulsePos;
          const py = n.y + (target.y - n.y) * pulsePos;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.globalAlpha = 0.5 * progress;
          ctx.fill();
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.globalAlpha = progress;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Label
        ctx.font = "9px Inter, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y + 14);
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (w / rect.width);
      const my = (e.clientY - rect.top) * (h / rect.height);
      let found: KGNode | null = null;
      for (const n of nodesRef.current) {
        const d = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        if (d < 20) { found = n; break; }
      }
      setHoveredNode(found);
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [domain, method]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ width: 500, height: 300 }}
        className="w-full max-w-[500px] mx-auto"
      />
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute glass-panel rounded-lg px-3 py-2 text-xs pointer-events-none"
          style={{
            left: "50%",
            bottom: "100%",
            transform: "translateX(-50%)",
          }}
        >
          <span style={{ color: hoveredNode.color }}>{hoveredNode.label}</span>
          <p className="text-muted-foreground mt-0.5">Connected research concept</p>
        </motion.div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
