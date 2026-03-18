import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, Zap, FlaskConical, HeartPulse, CloudSun, Rocket,
  FileText, Database, Cpu, Share2,
  Network, Layers, TrendingUp, GitBranch, Code, Brain, Shuffle, Boxes,
  Lightbulb, Beaker, BarChart3, Gem, Link,
  ArrowRight, RotateCcw, ExternalLink, BookOpen, Lock,
  Microscope, Dna, Sparkles, Orbit, CircuitBoard,
  User, Mail, X
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import BootSequence from "@/components/BootSequence";
import SelectionCard from "@/components/SelectionCard";
import ReasoningAnimation from "@/components/ReasoningAnimation";
import DiscoveryArchive from "@/components/DiscoveryArchive";
import SystemStatus from "@/components/SystemStatus";
import GameHUD from "@/components/GameHUD";
import CollectionGrid from "@/components/CollectionGrid";
import ScorePopup from "@/components/ScorePopup";
import GlobalFeed from "@/components/GlobalFeed";
import {
  getInsight, isBreakthroughCombo, calculateScore, getXpForLevel, getRank,
  getRarityLabel,
  INITIAL_STATS, type PlayerStats, type InsightData,
} from "@/data/insights";

type Phase = "boot" | "select" | "reasoning" | "insight";

const domains = [
  { label: "Materials Science", icon: Atom, desc: "Discover novel materials and compounds" },
  { label: "Energy Technology", icon: Zap, desc: "Explore clean energy innovations" },
  { label: "Chemistry", icon: FlaskConical, desc: "Analyze chemical reactions and synthesis" },
  { label: "Medicine", icon: HeartPulse, desc: "Investigate drug targets and biomarkers" },
  { label: "Climate Science", icon: CloudSun, desc: "Model climate systems and solutions" },
  { label: "Aerospace", icon: Rocket, desc: "Optimize propulsion and materials" },
  { label: "Quantum Physics", icon: CircuitBoard, desc: "Explore quantum computing frontiers" },
  { label: "Biotechnology", icon: Dna, desc: "Engineer biological systems" },
  { label: "Artificial Intelligence", icon: Brain, desc: "Discover emergent AI patterns" },
  { label: "Neuroscience", icon: Microscope, desc: "Map brain and cognition" },
  { label: "Astrophysics", icon: Orbit, desc: "Probe cosmic phenomena" },
  { label: "Nanotechnology", icon: Boxes, desc: "Design molecular machines" },
];

const sources = [
  { label: "Scientific Papers", icon: FileText, desc: "Analyze published research literature" },
  { label: "Experimental Datasets", icon: Database, desc: "Process laboratory measurements" },
  { label: "Simulation Data", icon: Cpu, desc: "Use computational model outputs" },
  { label: "Knowledge Graph", icon: Share2, desc: "Traverse connected scientific knowledge" },
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

const rarityBadge: Record<string, string> = {
  mythic: "bg-destructive/15 text-destructive border-destructive/30",
  legendary: "bg-warning/15 text-warning border-warning/30",
  epic: "bg-rarity-epic/15 text-rarity-epic border-rarity-epic/30",
  rare: "bg-rarity-rare/15 text-rarity-rare border-rarity-rare/30",
  common: "bg-rarity-common/15 text-rarity-common border-rarity-common/30",
};

const impactBadge: Record<string, string> = {
  "Paradigm Shift": "bg-destructive/15 text-destructive",
  "Breakthrough": "bg-warning/15 text-warning",
  "High": "bg-rarity-epic/15 text-rarity-epic",
  "Moderate": "bg-rarity-rare/15 text-rarity-rare",
  "Low": "bg-rarity-common/15 text-rarity-common",
};

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

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, energy: Math.min(prev.energy + 1, prev.maxEnergy) }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const canRun = domain && source && method && objective && stats.energy > 0;
  const isDomainLocked = (d: string) => !stats.unlockedDomains.includes(d);
  const getDomainUnlockLevel = (d: string): number => {
    const map: Record<string, number> = {
      "Medicine": 2, "Climate Science": 3, "Aerospace": 4,
      "Quantum Physics": 5, "Biotechnology": 6, "Artificial Intelligence": 7,
      "Neuroscience": 8, "Astrophysics": 9, "Nanotechnology": 10,
    };
    return map[d] || 1;
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
        maxEnergy: 10 + Math.floor(newLevel / 2),
        reputation: prev.reputation + Math.floor(points * 0.1),
        rank: getRank(newLevel),
        unlockedDomains: unlocked,
        collectedInsights: isNew ? [...prev.collectedInsights, insight.id] : prev.collectedInsights,
      };
    });

    setScorePopup({ points, insight, isNew });

    setDiscoveries((prev) => [{
      id: prev.length + 1,
      title: insight.title,
      description: insight.hypothesis.slice(0, 120) + "...",
      domain,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      impact: insight.impact,
      confidence: insight.confidence,
    }, ...prev]);

    setPhase("insight");
  }, [domain, source, method, objective, stats]);

  const handleReset = () => {
    setPhase("select");
    setCurrentInsight(null);
    setIsBreakthrough(false);
    setScorePopup(null);
  };

  if (phase === "boot") {
    return <BootSequence onComplete={() => setPhase("select")} />;
  }

  const selectedCount = [domain, source, method, objective].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Score popup */}
      <AnimatePresence>
        {scorePopup && (
          <ScorePopup points={scorePopup.points} insight={scorePopup.insight} isNew={scorePopup.isNew} onDone={() => setScorePopup(null)} />
        )}
      </AnimatePresence>

      {/* Collection modal */}
      <AnimatePresence>
        {showCollection && <CollectionGrid collectedIds={stats.collectedInsights} onClose={() => setShowCollection(false)} />}
      </AnimatePresence>

      {/* Profile modal */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40 }}
              className="bg-popover rounded-t-2xl md:rounded-2xl border border-border shadow-2xl p-6 w-full md:max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile hero */}
              <div className="text-center mb-6 pb-6 border-b border-border" style={{ background: 'linear-gradient(180deg, hsl(0 53% 5%) 0%, transparent 100%)', margin: '-24px -24px 24px', padding: '24px 24px 20px', borderRadius: '16px 16px 0 0' }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto mb-3 red-glow">
                  <User size={28} className="text-destructive" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Scientist Profile</h3>
                <p className="text-xs text-destructive font-semibold mt-1">Lvl {stats.level} {stats.rank}</p>
                {/* XP bar */}
                <div className="mt-3 max-w-[200px] mx-auto">
                  <div className="h-[3px] rounded-full bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${(stats.xp / stats.xpToNext) * 100}%`, background: 'linear-gradient(90deg, #C0392B, #E74C3C)' }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">{stats.xp} / {stats.xpToNext} XP to Level {stats.level + 1}</p>
                </div>
              </div>

              <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors">
                <X size={16} className="text-muted-foreground" />
              </button>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Discoveries", value: String(stats.totalDiscoveries) },
                  { label: "Legendary+", value: String(stats.breakthroughs) },
                  { label: "Domains", value: `${stats.unlockedDomains.length}/12` },
                  { label: "Best Streak", value: `×${stats.bestStreak}` },
                  { label: "Total XP", value: stats.score.toLocaleString() },
                  { label: "Reputation", value: stats.reputation.toLocaleString() },
                ].map((item) => (
                  <div key={item.label} className="bg-secondary rounded-xl p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-lg font-extrabold text-foreground font-mono tabular-nums mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <p className="eyebrow mb-2" style={{ fontSize: '9px' }}>Contact</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-mono">apeironaipro@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-mono">cherazen.ai@gmail.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-lg border-b border-border" style={{ background: 'hsl(210 33% 4% / 0.9)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <img src={logoImg} alt="IntelliZ" className="w-8 h-8 rounded-lg" />
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">IntelliZ Research</h1>
              <p className="text-[10px] text-muted-foreground hidden sm:block">Powered by Cherazen</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <GameHUD stats={stats} />
            <button onClick={() => setShowCollection(true)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors">
              <BookOpen size={15} className="text-muted-foreground" />
            </button>
            <button onClick={() => setShowProfile(true)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-border transition-colors">
              <User size={15} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {phase === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {/* Research Mission header */}
              <div className="mb-6">
                <p className="eyebrow mb-2">Research Mission</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight" style={{ letterSpacing: '-1px' }}>
                  Configure your discovery parameters
                </h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-lg">
                  Select domain, data source, reasoning engine, and objective to run an AI exploration.
                </p>
              </div>

              {/* Steps indicator */}
              <div className="flex items-center gap-3 mb-6">
                {[
                  { n: 1, label: "Domain", done: !!domain },
                  { n: 2, label: "Source", done: !!source },
                  { n: 3, label: "Method", done: !!method },
                  { n: 4, label: "Objective", done: !!objective },
                ].map((step) => (
                  <div key={step.n} className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      step.done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      {step.n}
                    </div>
                    <span className={`text-xs font-medium hidden sm:inline ${step.done ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
                <div className="ml-auto text-xs text-muted-foreground font-mono">{selectedCount}/4</div>
              </div>

              {/* Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {/* Domain */}
                <div>
                  <h3 className="eyebrow mb-1">01 / Domain</h3>
                  <p className="text-[13px] text-muted-foreground mb-3">Select Scientific Field</p>
                  <div className="space-y-2 max-h-[320px] md:max-h-none overflow-y-auto">
                    {domains.map((d, i) => {
                      const locked = isDomainLocked(d.label);
                      return (
                        <SelectionCard
                          key={d.label}
                          icon={d.icon}
                          label={d.label}
                          description={d.desc}
                          selected={domain === d.label}
                          locked={locked}
                          unlockLevel={locked ? getDomainUnlockLevel(d.label) : undefined}
                          onClick={() => !locked && setDomain(d.label)}
                          delay={i * 0.02}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Source */}
                <div>
                  <h3 className="eyebrow mb-1">02 / Source</h3>
                  <p className="text-[13px] text-muted-foreground mb-3">Choose Data Input</p>
                  <div className="space-y-2">
                    {sources.map((s, i) => (
                      <SelectionCard
                        key={s.label}
                        icon={s.icon}
                        label={s.label}
                        description={s.desc}
                        selected={source === s.label}
                        onClick={() => setSource(s.label)}
                        delay={i * 0.02 + 0.1}
                      />
                    ))}
                  </div>
                </div>

                {/* Method */}
                <div>
                  <h3 className="eyebrow mb-1">03 / Method</h3>
                  <p className="text-[13px] text-muted-foreground mb-3">Reasoning Engine</p>
                  <div className="space-y-2">
                    {methods.map((m, i) => (
                      <SelectionCard
                        key={m.label}
                        icon={m.icon}
                        label={m.label}
                        selected={method === m.label}
                        onClick={() => setMethod(m.label)}
                        delay={i * 0.02 + 0.2}
                      />
                    ))}
                  </div>
                </div>

                {/* Objective */}
                <div>
                  <h3 className="eyebrow mb-1">04 / Objective</h3>
                  <p className="text-[13px] text-muted-foreground mb-3">Research Goal</p>
                  <div className="space-y-2">
                    {objectives.map((o, i) => (
                      <SelectionCard
                        key={o.label}
                        icon={o.icon}
                        label={o.label}
                        selected={objective === o.label}
                        onClick={() => setObjective(o.label)}
                        delay={i * 0.02 + 0.3}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Run Button */}
              <div className="flex justify-center mb-8">
                <motion.button
                  onClick={handleRun}
                  disabled={!canRun}
                  whileHover={canRun ? { scale: 1.02 } : {}}
                  whileTap={canRun ? { scale: 0.97 } : {}}
                  className="btn-primary text-base flex items-center gap-2 w-full md:w-auto justify-center"
                  style={{ height: '56px', fontSize: '16px' }}
                >
                  RUN AI EXPLORATION
                  <ArrowRight size={18} />
                </motion.button>
              </div>

              {/* Status + Feed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <SystemStatus />
                <GlobalFeed />
              </div>

              {/* Archive */}
              {discoveries.length > 0 && (
                <DiscoveryArchive discoveries={discoveries} />
              )}
            </motion.div>
          )}

          {phase === "reasoning" && (
            <motion.div key="reasoning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
              <ReasoningAnimation onComplete={handleReasoningComplete} />
            </motion.div>
          )}

          {phase === "insight" && currentInsight && (
            <motion.div key="insight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
              {/* Breakthrough */}
              {isBreakthrough && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-warning/15 text-warning border border-warning/30">
                    <Sparkles size={14} />
                    Breakthrough Pattern — 2× Score Bonus!
                  </span>
                </motion.div>
              )}

              {/* Discovery label */}
              <p className="eyebrow text-center mb-4">
                ⚡ Discovery Detected
              </p>

              {/* Insight Card */}
              <div className="bg-popover rounded-2xl border border-border shadow-2xl p-6 md:p-8">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${rarityBadge[currentInsight.rarity] || rarityBadge.common}`}>
                    {getRarityLabel(currentInsight.rarity)}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${impactBadge[currentInsight.impact] || impactBadge.Low}`}>
                    {currentInsight.impact}
                  </span>
                  <span className="text-[11px] text-muted-foreground ml-auto font-mono">
                    {currentInsight.confidence}% · +{currentInsight.points} pts
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-foreground mb-4" style={{ letterSpacing: '-1px' }}>
                  {currentInsight.title}
                </h3>

                <div className="mb-4">
                  <p className="eyebrow mb-1.5" style={{ fontSize: '10px' }}>Hypothesis</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{currentInsight.hypothesis}</p>
                </div>

                <div className="mb-5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Research Insight</p>
                  <p className="text-sm text-foreground/60 leading-relaxed">{currentInsight.insight}</p>
                </div>

                {/* Confidence bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <span className="text-xs font-bold text-foreground font-mono">{currentInsight.confidence}%</span>
                  </div>
                  <div className="h-[3px] rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentInsight.confidence}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #C0392B, #E74C3C)' }}
                    />
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground font-mono">
                  Generated by IntelliZ Research · Powered by Cherazen
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  Run Another Exploration
                </motion.button>
                <button
                  onClick={() => setShowCollection(true)}
                  className="px-5 py-3 rounded-xl text-sm font-semibold bg-secondary text-foreground hover:bg-border transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen size={14} />
                  Archive ({stats.collectedInsights.length}/48)
                </button>
                <a
                  href="https://ai.cherazen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl text-sm font-semibold bg-secondary text-foreground hover:bg-border transition-colors flex items-center justify-center gap-2"
                >
                  Explore IntelliZ
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Recent discoveries */}
              {discoveries.length > 0 && (
                <div className="mt-8">
                  <DiscoveryArchive discoveries={discoveries} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* System Status Bar (bottom) */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-border py-2 px-4" style={{ background: 'hsl(210 33% 4% / 0.95)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
            <span className="text-[10px] text-success font-bold font-mono">SYSTEM ONLINE</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono hidden sm:block">
            IntelliZ Research · Powered by Cherazen Research Systems
          </p>
          <button onClick={() => setShowCollection(true)} className="text-[10px] text-destructive font-bold font-mono hover:underline">
            LIVE DISCOVERY FEED ▸
          </button>
        </div>
      </footer>

      {/* Bottom padding for fixed footer */}
      <div className="h-12" />
    </div>
  );
};

export default DiscoveryLab;
