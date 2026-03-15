import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, Zap, FlaskConical, HeartPulse, CloudSun, Rocket,
  FileText, Database, Cpu, Share2,
  Network, Layers, TrendingUp, GitBranch, Code,
  Lightbulb, Beaker, BarChart3, Gem, Link,
  ArrowRight, RotateCcw, ExternalLink
} from "lucide-react";
import ParticleField from "@/components/ParticleField";
import BootSequence from "@/components/BootSequence";
import AICore from "@/components/AICore";
import SelectionCard from "@/components/SelectionCard";
import ReasoningAnimation from "@/components/ReasoningAnimation";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import DiscoveryArchive from "@/components/DiscoveryArchive";
import SystemStatus from "@/components/SystemStatus";
import { getInsight, isBreakthroughCombo, type InsightData } from "@/data/insights";
import cherazenLogo from "@/assets/cherazen-logo.jpg";

type Phase = "boot" | "select" | "reasoning" | "insight";

const domains = [
  { label: "Materials Science", icon: Atom },
  { label: "Energy Technology", icon: Zap },
  { label: "Chemistry", icon: FlaskConical },
  { label: "Medicine", icon: HeartPulse },
  { label: "Climate Science", icon: CloudSun },
  { label: "Aerospace", icon: Rocket },
];

const sources = [
  { label: "Scientific Papers", icon: FileText },
  { label: "Experimental Datasets", icon: Database },
  { label: "Simulation Data", icon: Cpu },
  { label: "Knowledge Graph", icon: Share2 },
];

const methods = [
  { label: "Graph Neural Networks", icon: Network },
  { label: "Transformer Models", icon: Layers },
  { label: "Probabilistic Reasoning", icon: TrendingUp },
  { label: "Evolutionary Search", icon: GitBranch },
  { label: "Symbolic Reasoning", icon: Code },
];

const objectives = [
  { label: "Generate Hypothesis", icon: Lightbulb },
  { label: "Design Experiment", icon: Beaker },
  { label: "Predict Experimental Outcome", icon: BarChart3 },
  { label: "Discover New Materials", icon: Gem },
  { label: "Identify Hidden Relationships", icon: Link },
];

interface Discovery {
  id: number;
  title: string;
  description: string;
  domain: string;
  timestamp: string;
}

const DiscoveryLab = () => {
  const [phase, setPhase] = useState<Phase>("boot");
  const [domain, setDomain] = useState("");
  const [source, setSource] = useState("");
  const [method, setMethod] = useState("");
  const [objective, setObjective] = useState("");
  const [discoveries, setDiscoveries] = useState<Discovery[]>([]);
  const [currentInsight, setCurrentInsight] = useState<InsightData | null>(null);
  const [isBreakthrough, setIsBreakthrough] = useState(false);
  const runCount = useRef(0);

  const canRun = domain && source && method && objective;

  const handleRun = useCallback(() => {
    if (!canRun) return;
    setPhase("reasoning");
  }, [canRun]);

  const handleReasoningComplete = useCallback(() => {
    const breakthrough = isBreakthroughCombo(domain, source, method, objective);
    const insight = getInsight(domain, runCount.current);
    runCount.current++;

    setIsBreakthrough(breakthrough);
    setCurrentInsight(insight);

    const newDiscovery: Discovery = {
      id: discoveries.length + 1,
      title: insight.title,
      description: insight.hypothesis.slice(0, 120) + "...",
      domain,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setDiscoveries((prev) => [newDiscovery, ...prev]);
    setPhase("insight");
  }, [domain, source, method, objective, discoveries.length]);

  const handleReset = () => {
    setPhase("select");
    setCurrentInsight(null);
    setIsBreakthrough(false);
  };

  if (phase === "boot") {
    return <BootSequence onComplete={() => setPhase("select")} />;
  }

  return (
    <div className="relative min-h-screen" style={{ background: "#0A0A0B" }}>
      <ParticleField />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={cherazenLogo} alt="Cherazen" className="w-8 h-8 rounded-md" />
            <div>
              <h1 className="font-serif text-lg font-semibold tracking-tight text-foreground">Discovery Lab</h1>
              <p className="font-mono text-[9px] text-muted-foreground tracking-wider">CHERAZEN RESEARCH SYSTEMS · v1.0</p>
            </div>
          </div>
          <SystemStatus />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
          <AnimatePresence mode="wait">
            {phase === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl"
              >
                {/* Hero */}
                <div className="text-center mb-10">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-[10px] tracking-[0.3em] uppercase text-lab-teal mb-3"
                  >
                    Interactive AI Research Console
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-3xl md:text-4xl font-semibold tracking-tight italic text-foreground"
                  >
                    Synthesizing the future of scientific inquiry
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto"
                  >
                    Select research parameters to explore how AI systems combine knowledge
                    from scientific literature, datasets, and reasoning models to generate new hypotheses.
                  </motion.p>
                </div>

                {/* AI Core */}
                <div className="flex justify-center mb-8">
                  <AICore active={!!canRun} size={140} />
                </div>

                {/* Selection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Domain */}
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
                      01 — Research Domain
                    </p>
                    <div className="space-y-2">
                      {domains.map((d, i) => (
                        <SelectionCard
                          key={d.label}
                          icon={d.icon}
                          label={d.label}
                          selected={domain === d.label}
                          onClick={() => setDomain(d.label)}
                          delay={i * 0.05}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Source */}
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
                      02 — Data Source
                    </p>
                    <div className="space-y-2">
                      {sources.map((s, i) => (
                        <SelectionCard
                          key={s.label}
                          icon={s.icon}
                          label={s.label}
                          selected={source === s.label}
                          onClick={() => setSource(s.label)}
                          delay={i * 0.05 + 0.1}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Method */}
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
                      03 — Reasoning Method
                    </p>
                    <div className="space-y-2">
                      {methods.map((m, i) => (
                        <SelectionCard
                          key={m.label}
                          icon={m.icon}
                          label={m.label}
                          selected={method === m.label}
                          onClick={() => setMethod(m.label)}
                          delay={i * 0.05 + 0.2}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Objective */}
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
                      04 — Research Objective
                    </p>
                    <div className="space-y-2">
                      {objectives.map((o, i) => (
                        <SelectionCard
                          key={o.label}
                          icon={o.icon}
                          label={o.label}
                          selected={objective === o.label}
                          onClick={() => setObjective(o.label)}
                          delay={i * 0.05 + 0.3}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Run Button */}
                <div className="flex justify-center">
                  <motion.button
                    whileHover={canRun ? { scale: 1.02 } : undefined}
                    whileTap={canRun ? { scale: 0.98 } : undefined}
                    onClick={handleRun}
                    disabled={!canRun}
                    className="font-mono text-sm tracking-wider uppercase px-8 py-3 rounded-xl transition-all duration-200"
                    style={{
                      background: canRun
                        ? "linear-gradient(135deg, rgba(123,92,255,0.2), rgba(29,233,182,0.2))"
                        : "rgba(255,255,255,0.03)",
                      boxShadow: canRun
                        ? "0 0 0 1px rgba(123,92,255,0.3), 0 0 30px rgba(123,92,255,0.15)"
                        : "0 0 0 1px rgba(255,255,255,0.05)",
                      color: canRun ? "#fff" : "rgba(255,255,255,0.25)",
                      cursor: canRun ? "pointer" : "not-allowed",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      Run AI Exploration
                      <ArrowRight size={16} />
                    </span>
                  </motion.button>
                </div>

                {/* Discovery Archive */}
                {discoveries.length > 0 && (
                  <div className="fixed right-4 top-24 z-20 hidden lg:block">
                    <DiscoveryArchive discoveries={discoveries} />
                  </div>
                )}
              </motion.div>
            )}

            {phase === "reasoning" && (
              <motion.div
                key="reasoning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center w-full max-w-3xl"
              >
                <AICore active size={200} />
                <ReasoningAnimation onComplete={handleReasoningComplete} />
                {domain && method && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <KnowledgeGraph domain={domain} method={method} />
                  </motion.div>
                )}
              </motion.div>
            )}

            {phase === "insight" && currentInsight && (
              <motion.div
                key="insight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                className="w-full max-w-2xl"
              >
                {/* Breakthrough banner */}
                {isBreakthrough && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-6"
                  >
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase"
                      style={{
                        background: "rgba(255,77,166,0.15)",
                        boxShadow: "0 0 30px rgba(255,77,166,0.2), 0 0 0 1px rgba(255,77,166,0.3)",
                        color: "#FF4DA6",
                      }}
                    >
                      <Gem size={14} />
                      Breakthrough Pattern Detected
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This combination suggests a promising research direction with high potential impact.
                    </p>
                  </motion.div>
                )}

                {/* Insight Card */}
                <div
                  className="glass-panel rounded-2xl p-8"
                  style={{
                    boxShadow: isBreakthrough
                      ? "0 0 0 1px rgba(255,77,166,0.2), 0 0 60px rgba(255,77,166,0.1), 0 20px 40px rgba(0,0,0,0.5)"
                      : "0 0 0 1px rgba(123,92,255,0.15), 0 20px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                    AI Generated Insight
                  </p>
                  <p className="font-mono text-[10px] text-lab-violet mb-4">
                    HYPOTHESIS_GEN_{String(discoveries.length).padStart(3, "0")}
                  </p>

                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground mb-4 italic">
                    {currentInsight.title}
                  </h3>

                  <div className="mb-4">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-lab-teal mb-2">
                      Hypothesis Generated
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed" style={{ maxWidth: "65ch" }}>
                      {currentInsight.hypothesis}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-lab-violet mb-2">
                      Research Insight
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed" style={{ maxWidth: "65ch" }}>
                      {currentInsight.insight}
                    </p>
                  </div>

                  <p className="text-[10px] text-muted-foreground italic">
                    Example insight generated by ApeironAI research systems
                  </p>
                </div>

                {/* Knowledge Graph */}
                {domain && method && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6"
                  >
                    <KnowledgeGraph domain={domain} method={method} />
                  </motion.div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://ai.cherazen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm tracking-wider uppercase px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, rgba(123,92,255,0.25), rgba(29,233,182,0.15))",
                      boxShadow: "0 0 0 1px rgba(123,92,255,0.4), 0 0 30px rgba(123,92,255,0.15)",
                      color: "#fff",
                    }}
                  >
                    Explore ApeironAI
                    <ExternalLink size={14} />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="font-mono text-sm tracking-wider uppercase px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <RotateCcw size={14} />
                    Run Another Exploration
                  </motion.button>
                </div>

                {/* Mobile Archive */}
                {discoveries.length > 0 && (
                  <div className="mt-8 lg:hidden">
                    <DiscoveryArchive discoveries={discoveries} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DiscoveryLab;
