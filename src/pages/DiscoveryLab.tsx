import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, Zap, FlaskConical, HeartPulse, CloudSun, Rocket,
  FileText, Database, Cpu, Share2,
  Network, Layers, TrendingUp, GitBranch, Code, Brain, Shuffle, Boxes,
  Lightbulb, Beaker, BarChart3, Gem, Link,
  ArrowRight, RotateCcw, ExternalLink, BookOpen, Lock,
  Microscope, Dna, Sparkles, Globe, Orbit, CircuitBoard,
  User, Mail
} from "lucide-react";
import ParticleField from "@/components/ParticleField";
import BootSequence from "@/components/BootSequence";
import AICore from "@/components/AICore";
import SelectionCard from "@/components/SelectionCard";
import ReasoningAnimation from "@/components/ReasoningAnimation";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import DiscoveryArchive from "@/components/DiscoveryArchive";
import SystemStatus from "@/components/SystemStatus";
import GameHUD from "@/components/GameHUD";
import CollectionGrid from "@/components/CollectionGrid";
import ScorePopup from "@/components/ScorePopup";
import GlobalFeed from "@/components/GlobalFeed";
import {
  getInsight, isBreakthroughCombo, calculateScore, getXpForLevel, getRank,
  getRarityColor, getRarityLabel, getImpactColor,
  INITIAL_STATS, type PlayerStats, type InsightData,
} from "@/data/insights";

type Phase = "boot" | "select" | "reasoning" | "insight";

const domains = [
  { label: "Materials Science", icon: Atom },
  { label: "Energy Technology", icon: Zap },
  { label: "Chemistry", icon: FlaskConical },
  { label: "Medicine", icon: HeartPulse },
  { label: "Climate Science", icon: CloudSun },
  { label: "Aerospace", icon: Rocket },
  { label: "Quantum Physics", icon: CircuitBoard },
  { label: "Biotechnology", icon: Dna },
  { label: "Artificial Intelligence", icon: Brain },
  { label: "Neuroscience", icon: Microscope },
  { label: "Astrophysics", icon: Orbit },
  { label: "Nanotechnology", icon: Boxes },
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
  { label: "Evolutionary Algorithms", icon: GitBranch },
  { label: "Symbolic Reasoning", icon: Code },
  { label: "Reinforcement Learning", icon: Shuffle },
  { label: "Hybrid AI Systems", icon: Brain },
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
  impact?: string;
  confidence?: number;
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
  const [showCollection, setShowCollection] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [scorePopup, setScorePopup] = useState<{ points: number; insight: InsightData; isNew: boolean } | null>(null);
  const [stats, setStats] = useState<PlayerStats>(INITIAL_STATS);
  const runCount = useRef(0);

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        energy: Math.min(prev.energy + 1, prev.maxEnergy),
      }));
    }, 30000); // 1 energy per 30s
    return () => clearInterval(interval);
  }, []);

  const canRun = domain && source && method && objective && stats.energy > 0;

  const isDomainLocked = (d: string) => !stats.unlockedDomains.includes(d);

  const getDomainUnlockLevel = (d: string): number => {
    const unlockMap: Record<string, number> = {
      "Medicine": 2, "Climate Science": 3, "Aerospace": 4,
      "Quantum Physics": 5, "Biotechnology": 6, "Artificial Intelligence": 7,
      "Neuroscience": 8, "Astrophysics": 9, "Nanotechnology": 10,
    };
    return unlockMap[d] || 1;
  };

  const handleDomainSelect = (d: string) => {
    if (isDomainLocked(d)) return;
    setDomain(d);
  };

  const handleRun = useCallback(() => {
    if (!canRun) return;
    setStats((prev) => ({ ...prev, energy: prev.energy - 1 }));
    setPhase("reasoning");
  }, [canRun]);

  const handleReasoningComplete = useCallback(() => {
    const breakthrough = isBreakthroughCombo(domain, source, method, objective);
    const insight = getInsight(domain, runCount.current, breakthrough);
    runCount.current++;

    const isNew = !stats.collectedInsights.includes(insight.id);
    const points = calculateScore(insight.rarity, stats.streak, breakthrough);

    setIsBreakthrough(breakthrough);
    setCurrentInsight(insight);

    setStats((prev) => {
      const newXp = prev.xp + points;
      let newLevel = prev.level;
      let xpRemaining = newXp;
      let xpToNext = prev.xpToNext;

      while (xpRemaining >= xpToNext) {
        xpRemaining -= xpToNext;
        newLevel++;
        xpToNext = getXpForLevel(newLevel);
      }

      const unlocked = [...prev.unlockedDomains];
      const domainUnlocks: Record<number, string> = {
        2: "Medicine", 3: "Climate Science", 4: "Aerospace",
        5: "Quantum Physics", 6: "Biotechnology", 7: "Artificial Intelligence",
        8: "Neuroscience", 9: "Astrophysics", 10: "Nanotechnology",
      };
      for (const [lvl, dom] of Object.entries(domainUnlocks)) {
        if (newLevel >= Number(lvl) && !unlocked.includes(dom)) unlocked.push(dom);
      }

      const newCollected = isNew ? [...prev.collectedInsights, insight.id] : prev.collectedInsights;
      const newMaxEnergy = 10 + Math.floor(newLevel / 2);

      return {
        score: prev.score + points,
        level: newLevel,
        xp: xpRemaining,
        xpToNext,
        totalDiscoveries: prev.totalDiscoveries + 1,
        streak: prev.streak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
        breakthroughs: prev.breakthroughs + (breakthrough ? 1 : 0),
        energy: prev.energy,
        maxEnergy: newMaxEnergy,
        reputation: prev.reputation + Math.floor(points * 0.1),
        rank: getRank(newLevel),
        unlockedDomains: unlocked,
        collectedInsights: newCollected,
      };
    });

    setScorePopup({ points, insight, isNew });

    const newDiscovery: Discovery = {
      id: discoveries.length + 1,
      title: insight.title,
      description: insight.hypothesis.slice(0, 120) + "...",
      domain,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      impact: insight.impact,
      confidence: insight.confidence,
    };
    setDiscoveries((prev) => [newDiscovery, ...prev]);
    setPhase("insight");
  }, [domain, source, method, objective, discoveries.length, stats]);

  const handleReset = () => {
    setPhase("select");
    setCurrentInsight(null);
    setIsBreakthrough(false);
    setScorePopup(null);
  };

  if (phase === "boot") {
    return <BootSequence onComplete={() => setPhase("select")} />;
  }

  return (
    <div className="relative min-h-screen" style={{ background: "#05060a" }}>
      <ParticleField />

      {/* Score popup overlay */}
      <AnimatePresence>
        {scorePopup && (
          <ScorePopup
            points={scorePopup.points}
            insight={scorePopup.insight}
            isNew={scorePopup.isNew}
            onDone={() => setScorePopup(null)}
          />
        )}
      </AnimatePresence>

      {/* Collection modal */}
      <AnimatePresence>
        {showCollection && (
          <CollectionGrid
            collectedIds={stats.collectedInsights}
            onClose={() => setShowCollection(false)}
          />
        )}
      </AnimatePresence>

      {/* Profile modal */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(5,6,10,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              className="glass-panel rounded-2xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Scientist Profile</h3>
              <div className="space-y-3">
                {[
                  { label: "Research Rank", value: stats.rank, color: "#9f6bff" },
                  { label: "Level", value: String(stats.level), color: "#00ffd5" },
                  { label: "Total Discoveries", value: String(stats.totalDiscoveries), color: "#4cc9ff" },
                  { label: "Breakthroughs", value: String(stats.breakthroughs), color: "#ffd166" },
                  { label: "Best Streak", value: `×${stats.bestStreak}`, color: "#FF4DA6" },
                  { label: "Reputation", value: stats.reputation.toLocaleString(), color: "#9f6bff" },
                  { label: "Domains Mastered", value: `${stats.unlockedDomains.length}/12`, color: "#00ffd5" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="font-mono text-xs" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase mb-2">Contact</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail size={10} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">apeironaipro@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={10} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">cherazen.ai@gmail.com</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="mt-4 w-full font-mono text-xs text-muted-foreground hover:text-foreground transition-colors py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-3 md:px-6 py-2.5 md:py-3 flex-wrap gap-2 md:gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Infinity Logo */}
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center">
              <svg viewBox="0 0 36 20" className="w-8 h-5 infinity-pulse">
                <path
                  d="M10 10c0-4 3-8 8-8s8 4 8 8-3 8-8 8c-2 0-4-1-5.5-2.5C11 17 9 18 6.5 18 3 18 0 14 0 10s3-8 6.5-8C9 2 11 3 12.5 4.5 14 3 16 2 18 2"
                  fill="none"
                  stroke="#00ffd5"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-base md:text-lg font-semibold tracking-tight text-foreground">
                ApeironAI <span className="hidden sm:inline">Research Lab</span>
              </h1>
              <p className="font-mono text-[7px] md:text-[9px] text-muted-foreground tracking-wider">
                CHERAZEN RESEARCH SYSTEMS · v2.1
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <GameHUD stats={stats} showCombo={scorePopup?.points} />
            <button
              onClick={() => setShowCollection(true)}
              className="glass-panel rounded-lg px-2 py-1.5 md:px-3 md:py-2 font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <BookOpen size={11} />
              <span className="hidden sm:inline">Archive</span>
            </button>
            <button
              onClick={() => setShowProfile(true)}
              className="glass-panel rounded-lg px-2 py-1.5 md:px-3 md:py-2 font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <User size={11} />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-start md:justify-center px-3 md:px-4 pb-8 pt-2 md:pt-0">
          <AnimatePresence mode="wait">
            {phase === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl"
              >
                {/* Hero */}
                <div className="text-center mb-6 md:mb-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-ap-cyan mb-2 md:mb-3"
                  >
                    Exploring Infinite Intelligence Through Scientific Discovery
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight italic text-foreground"
                  >
                    <span className="text-gradient-apeiron">Configure your research parameters</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3 max-w-lg mx-auto"
                  >
                    Select research parameters, run AI explorations, collect discoveries, and unlock new domains.
                  </motion.p>

                  {stats.energy <= 3 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      className="font-mono text-[9px] md:text-[10px] text-ap-gold mt-2"
                    >
                      ⚡ Energy: {stats.energy}/{stats.maxEnergy} — regenerates over time
                    </motion.p>
                  )}
                </div>

                {/* AI Core */}
                <div className="flex justify-center mb-4 md:mb-6">
                  <AICore active={!!canRun} size={typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 120} />
                </div>

                {/* Selection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
                  {/* Domain */}
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-muted-foreground mb-2 md:mb-3">
                      01 — Research Domain
                    </p>
                    <div className="space-y-1.5 md:space-y-2 max-h-[280px] md:max-h-none overflow-y-auto pr-1">
                      {domains.map((d, i) => {
                        const locked = isDomainLocked(d.label);
                        return locked ? (
                          <motion.div
                            key={d.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 0.35, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.03 }}
                            className="lab-card p-3 md:p-4 flex items-center gap-3 cursor-not-allowed"
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.02)" }}>
                              <Lock size={13} className="text-muted-foreground" />
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">{d.label}</span>
                              <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground">Lvl {getDomainUnlockLevel(d.label)}</p>
                            </div>
                          </motion.div>
                        ) : (
                          <SelectionCard
                            key={d.label}
                            icon={d.icon}
                            label={d.label}
                            selected={domain === d.label}
                            onClick={() => handleDomainSelect(d.label)}
                            delay={i * 0.03}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Source */}
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-muted-foreground mb-2 md:mb-3">
                      02 — Data Source
                    </p>
                    <div className="space-y-1.5 md:space-y-2">
                      {sources.map((s, i) => (
                        <SelectionCard
                          key={s.label}
                          icon={s.icon}
                          label={s.label}
                          selected={source === s.label}
                          onClick={() => setSource(s.label)}
                          delay={i * 0.03 + 0.1}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Method */}
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-muted-foreground mb-2 md:mb-3">
                      03 — Reasoning Engine
                    </p>
                    <div className="space-y-1.5 md:space-y-2">
                      {methods.map((m, i) => (
                        <SelectionCard
                          key={m.label}
                          icon={m.icon}
                          label={m.label}
                          selected={method === m.label}
                          onClick={() => setMethod(m.label)}
                          delay={i * 0.03 + 0.2}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Objective */}
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-muted-foreground mb-2 md:mb-3">
                      04 — Research Objective
                    </p>
                    <div className="space-y-1.5 md:space-y-2">
                      {objectives.map((o, i) => (
                        <SelectionCard
                          key={o.label}
                          icon={o.icon}
                          label={o.label}
                          selected={objective === o.label}
                          onClick={() => setObjective(o.label)}
                          delay={i * 0.03 + 0.3}
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
                    className="font-mono text-xs md:text-sm tracking-wider uppercase px-6 md:px-8 py-3 rounded-xl transition-all duration-200"
                    style={{
                      background: canRun
                        ? "linear-gradient(135deg, rgba(0,255,213,0.15), rgba(122,92,255,0.2))"
                        : "rgba(255,255,255,0.02)",
                      boxShadow: canRun
                        ? "0 0 0 1px rgba(0,255,213,0.25), 0 0 30px rgba(0,255,213,0.1)"
                        : "0 0 0 1px rgba(255,255,255,0.04)",
                      color: canRun ? "#fff" : "rgba(255,255,255,0.2)",
                      cursor: canRun ? "pointer" : "not-allowed",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      Run AI Exploration
                      <ArrowRight size={15} />
                    </span>
                  </motion.button>
                </div>

                {/* System Status + Feed */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-5 md:mt-6">
                  <SystemStatus />
                  <GlobalFeed />
                </div>

                {/* Discovery Archive - desktop sidebar */}
                {discoveries.length > 0 && (
                  <div className="fixed right-4 top-20 z-20 hidden lg:block">
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
                <AICore active size={typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 200} />
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] md:text-xs tracking-wider uppercase"
                      style={{
                        background: "rgba(0,255,213,0.1)",
                        boxShadow: "0 0 30px rgba(0,255,213,0.15), 0 0 0 1px rgba(0,255,213,0.25)",
                        color: "#00ffd5",
                      }}
                    >
                      <Sparkles size={14} />
                      Breakthrough Pattern Detected — 2× Score Bonus!
                    </div>
                  </motion.div>
                )}

                {/* Discovery Reveal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-4"
                >
                  <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase" style={{ color: getRarityColor(currentInsight.rarity) }}>
                    Discovery Detected
                  </p>
                </motion.div>

                {/* Insight Card */}
                <div
                  className="glass-panel rounded-2xl p-5 md:p-8"
                  style={{
                    boxShadow: isBreakthrough
                      ? "0 0 0 1px rgba(0,255,213,0.2), 0 0 60px rgba(0,255,213,0.08), 0 20px 40px rgba(0,0,0,0.5)"
                      : `0 0 0 1px ${getRarityColor(currentInsight.rarity)}20, 0 20px 40px rgba(0,0,0,0.5)`,
                  }}
                >
                  {/* Rarity + Impact badges */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{
                        background: `${getRarityColor(currentInsight.rarity)}12`,
                        color: getRarityColor(currentInsight.rarity),
                        border: `1px solid ${getRarityColor(currentInsight.rarity)}25`,
                      }}
                    >
                      {getRarityLabel(currentInsight.rarity)} Discovery
                    </span>
                    <span
                      className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{
                        background: `${getImpactColor(currentInsight.impact)}12`,
                        color: getImpactColor(currentInsight.impact),
                        border: `1px solid ${getImpactColor(currentInsight.impact)}25`,
                      }}
                    >
                      {currentInsight.impact}
                    </span>
                    <span className="font-mono text-[8px] md:text-[9px] text-muted-foreground">
                      +{currentInsight.points} pts · {currentInsight.confidence}% confidence
                    </span>
                  </div>

                  <p className="font-mono text-[9px] md:text-[10px] text-ap-violet mb-3 md:mb-4">
                    HYPOTHESIS_GEN_{String(discoveries.length).padStart(3, "0")}
                  </p>

                  <h3 className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-3 md:mb-4 italic">
                    {currentInsight.title}
                  </h3>

                  <div className="mb-3 md:mb-4">
                    <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-ap-cyan mb-2">
                      Hypothesis Generated
                    </p>
                    <p className="text-xs md:text-sm text-foreground/80 leading-relaxed" style={{ maxWidth: "65ch" }}>
                      {currentInsight.hypothesis}
                    </p>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <p className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-ap-violet mb-2">
                      Research Insight
                    </p>
                    <p className="text-xs md:text-sm text-foreground/70 leading-relaxed" style={{ maxWidth: "65ch" }}>
                      {currentInsight.insight}
                    </p>
                  </div>

                  {/* Confidence meter */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] text-muted-foreground">Confidence</span>
                      <span className="font-mono text-[9px] text-ap-cyan">{currentInsight.confidence}%</span>
                    </div>
                    <div className="h-1 rounded-full w-full" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${currentInsight.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, #7a5cff, ${currentInsight.confidence > 70 ? "#00ffd5" : currentInsight.confidence > 40 ? "#ffd166" : "#FF4DA6"})`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-[9px] md:text-[10px] text-muted-foreground italic">
                    Insight generated by ApeironAI research systems · Powered by Cherazen
                  </p>
                </div>

                {/* Knowledge Graph */}
                {domain && method && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 md:mt-6"
                  >
                    <KnowledgeGraph domain={domain} method={method} />
                  </motion.div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 mt-6 md:mt-8 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="font-mono text-xs md:text-sm tracking-wider uppercase px-5 md:px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,255,213,0.15), rgba(122,92,255,0.15))",
                      boxShadow: "0 0 0 1px rgba(0,255,213,0.3), 0 0 30px rgba(0,255,213,0.1)",
                      color: "#fff",
                    }}
                  >
                    <RotateCcw size={13} />
                    Run Another Exploration
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCollection(true)}
                    className="font-mono text-xs md:text-sm tracking-wider uppercase px-5 md:px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <BookOpen size={13} />
                    Archive ({stats.collectedInsights.length}/48)
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://ai.cherazen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs md:text-sm tracking-wider uppercase px-5 md:px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    Explore ApeironAI
                    <ExternalLink size={13} />
                  </motion.a>
                </div>

                {/* Mobile Archive */}
                {discoveries.length > 0 && (
                  <div className="mt-6 md:mt-8 lg:hidden">
                    <DiscoveryArchive discoveries={discoveries} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="px-4 py-3 flex items-center justify-center">
          <p className="font-mono text-[8px] md:text-[9px] text-muted-foreground/50 tracking-wider">
            ApeironAI Research Lab · Powered by Cherazen Research Systems
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DiscoveryLab;
