import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, Zap, FlaskConical, HeartPulse, CloudSun, Rocket,
  FileText, Database, Cpu, Share2,
  Network, Layers, TrendingUp, GitBranch, Code, Brain, Shuffle,
  Lightbulb, Beaker, BarChart3, Gem, Link,
  ArrowRight, RotateCcw, ExternalLink, BookOpen, ChevronDown,
  Microscope, Dna, Orbit, CircuitBoard, Boxes,
  User, Mail, X, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  getRarityLabel, getRarityColor,
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
  { label: "Graph Neural Networks", icon: Network, desc: "Learn from relational data structures" },
  { label: "Transformer Models", icon: Layers, desc: "Process sequential scientific data" },
  { label: "Probabilistic Reasoning", icon: TrendingUp, desc: "Model uncertainty in predictions" },
  { label: "Evolutionary Algorithms", icon: GitBranch, desc: "Optimize through selection pressure" },
  { label: "Symbolic Reasoning", icon: Code, desc: "Formal logic-based inference" },
  { label: "Reinforcement Learning", icon: Shuffle, desc: "Learn through trial and exploration" },
  { label: "Hybrid AI Systems", icon: Brain, desc: "Multi-model reasoning fusion" },
];

const objectives = [
  { label: "Generate Hypothesis", icon: Lightbulb, desc: "Propose novel scientific hypotheses" },
  { label: "Design Experiment", icon: Beaker, desc: "Create experimental frameworks" },
  { label: "Predict Experimental Outcome", icon: BarChart3, desc: "Forecast research results" },
  { label: "Discover New Materials", icon: Gem, desc: "Identify promising compounds" },
  { label: "Identify Hidden Relationships", icon: Link, desc: "Find cross-domain connections" },
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
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("boot");
  const [missionStep, setMissionStep] = useState(0); // 0=domain, 1=approach, 2=objective
  const [domain, setDomain] = useState("");
  const [source, setSource] = useState("");
  const [method, setMethod] = useState("");
  const [objective, setObjective] = useState("");
  const [discoveries, setDiscoveries] = useState<Discovery[]>([]);
  const [currentInsight, setCurrentInsight] = useState<InsightData | null>(null);
  const [isBreakthrough, setIsBreakthrough] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMoreMethods, setShowMoreMethods] = useState(false);
  const [scorePopup, setScorePopup] = useState<{ points: number; insight: InsightData; isNew: boolean } | null>(null);
  const [stats, setStats] = useState<PlayerStats>(INITIAL_STATS);
  const [flashVisible, setFlashVisible] = useState(false);
  const runCount = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({ ...prev, energy: Math.min(prev.energy + 1, prev.maxEnergy) }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const isDomainLocked = (d: string) => !stats.unlockedDomains.includes(d);
  const getDomainUnlockLevel = (d: string): number => {
    const map: Record<string, number> = {
      "Medicine": 2, "Climate Science": 3, "Aerospace": 4,
      "Quantum Physics": 5, "Biotechnology": 6, "Artificial Intelligence": 7,
      "Neuroscience": 8, "Astrophysics": 9, "Nanotechnology": 10,
    };
    return map[d] || 1;
  };

  const canLaunch = domain && source && method && objective && stats.energy > 0;

  const handleLaunch = useCallback(() => {
    if (!canLaunch) return;
    setStats((prev) => ({ ...prev, energy: prev.energy - 1 }));
    setPhase("reasoning");
  }, [canLaunch]);

  const handleReasoningComplete = useCallback(() => {
    const breakthrough = isBreakthroughCombo(domain, source, method, objective);
    const insight = getInsight(domain, runCount.current, breakthrough);
    runCount.current++;

    const isNew = !stats.collectedInsights.includes(insight.id);
    const points = calculateScore(insight.rarity, stats.streak, breakthrough);

    setIsBreakthrough(breakthrough);
    setCurrentInsight(insight);

    // Flash effect for discovery reveal
    setFlashVisible(true);
    setTimeout(() => setFlashVisible(false), 400);

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
    setMissionStep(0);
    setDomain("");
    setSource("");
    setMethod("");
    setObjective("");
    setCurrentInsight(null);
    setIsBreakthrough(false);
    setScorePopup(null);
  };

  const handleNextStep = () => {
    if (missionStep < 2) setMissionStep(missionStep + 1);
  };
  const handlePrevStep = () => {
    if (missionStep > 0) setMissionStep(missionStep - 1);
  };

  if (phase === "boot") {
    return <BootSequence onComplete={() => setPhase("select")} />;
  }

  const rarityBorderColor: Record<string, string> = {
    mythic: "border-destructive/40",
    legendary: "border-warning/40",
    epic: "border-rarity-epic/40",
    rare: "border-primary/40",
    common: "border-border",
  };

  const visibleMethods = showMoreMethods ? methods : methods.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Nebula glow bg */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full nebula-bg" style={{
          left: '50%', top: '30%', transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(79,142,247,0.05) 0%, rgba(123,92,240,0.03) 40%, transparent 70%)',
        }} />
      </div>

      {/* Flash overlay for discovery reveal */}
      <AnimatePresence>
        {flashVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Score popup */}
      <AnimatePresence>
        {scorePopup && <ScorePopup points={scorePopup.points} insight={scorePopup.insight} isNew={scorePopup.isNew} onDone={() => setScorePopup(null)} />}
      </AnimatePresence>

      {/* Collection modal */}
      <AnimatePresence>
        {showCollection && <CollectionGrid collectedIds={stats.collectedInsights} onClose={() => setShowCollection(false)} />}
      </AnimatePresence>

      {/* Profile modal */}
      <AnimatePresence>
        {showProfile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40 }}
              className="bg-card rounded-t-2xl md:rounded-2xl border border-border shadow-2xl p-6 w-full md:max-w-sm relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-secondary flex items-center justify-center hover:bg-border transition-colors">
                <X size={16} className="text-muted-foreground" />
              </button>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <User size={28} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">Scientist Profile</h3>
                <p className="text-xs text-primary font-semibold mt-1">Lvl {stats.level} · {stats.rank}</p>
                <div className="mt-3 max-w-[200px] mx-auto">
                  <div className="h-[2px] rounded-full bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${(stats.xp / stats.xpToNext) * 100}%`, background: 'linear-gradient(90deg, hsl(220 90% 56%), hsl(261 85% 60%))' }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">{stats.xp} / {stats.xpToNext} XP</p>
                </div>
              </div>
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
                    <p className="text-lg font-bold text-foreground font-mono tabular-nums mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Contact</p>
                <div className="space-y-1.5">
                  {["apeironaipro@gmail.com", "cherazen.ai@gmail.com"].map((email) => (
                    <div key={email} className="flex items-center gap-2">
                      <Mail size={11} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">{email}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 h-16 backdrop-blur-xl border-b border-border" style={{ background: 'hsl(228 27% 5% / 0.85)' }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5 h-full">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={logoImg} alt="ApeironAI" className="w-8 h-8 rounded-xl" />
              <div className="hidden sm:block">
                <h1 className="font-display text-sm font-bold text-foreground leading-tight">ApeironAI Reality Lab</h1>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <GameHUD stats={stats} />
            <button onClick={() => setShowCollection(true)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-border transition-colors">
              <BookOpen size={15} className="text-muted-foreground" />
            </button>
            <button onClick={() => setShowProfile(true)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-border transition-colors">
              <User size={15} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-[1200px] mx-auto px-5 py-8 md:py-12 relative z-10">
        <AnimatePresence mode="wait">
          {/* SELECT PHASE — 3-step wizard */}
          {phase === "select" && (
            <motion.div key="select" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-3 mb-10">
                {[0, 1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <button
                      onClick={() => setMissionStep(s)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        s === missionStep ? "bg-primary text-primary-foreground" :
                        s < missionStep ? "bg-primary/20 text-primary" :
                        "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {s + 1}
                    </button>
                    {s < 2 && <div className={`w-12 h-[2px] rounded-full ${s < missionStep ? "bg-primary/40" : "bg-secondary"}`} />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Domain */}
                {missionStep === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                    <div className="text-center mb-8">
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">01 — Choose Domain</h2>
                      <p className="text-muted-foreground mt-2">What scientific frontier will you explore?</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {domains.map((d, i) => {
                        const locked = isDomainLocked(d.label);
                        return (
                          <SelectionCard
                            key={d.label} icon={d.icon} label={d.label} description={d.desc}
                            selected={domain === d.label} locked={locked}
                            unlockLevel={locked ? getDomainUnlockLevel(d.label) : undefined}
                            onClick={() => { if (!locked) { setDomain(d.label); setTimeout(handleNextStep, 300); }}}
                            delay={i * 0.03}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Approach (Source + Method) */}
                {missionStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                    <div className="text-center mb-8">
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">02 — Research Approach</h2>
                      <p className="text-muted-foreground mt-2">Select your data source and reasoning method</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                      <div>
                        <h3 className="eyebrow mb-3">Data Source</h3>
                        <div className="space-y-2">
                          {sources.map((s, i) => (
                            <SelectionCard key={s.label} icon={s.icon} label={s.label} description={s.desc}
                              selected={source === s.label} onClick={() => setSource(s.label)} delay={i * 0.03} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="eyebrow mb-3">Reasoning Method</h3>
                        <div className="space-y-2">
                          {visibleMethods.map((m, i) => (
                            <SelectionCard key={m.label} icon={m.icon} label={m.label} description={m.desc}
                              selected={method === m.label} onClick={() => setMethod(m.label)} delay={i * 0.03} />
                          ))}
                          {!showMoreMethods && methods.length > 4 && (
                            <button onClick={() => setShowMoreMethods(true)}
                              className="w-full text-center py-2 text-xs text-primary hover:text-foreground transition-colors flex items-center justify-center gap-1">
                              <ChevronDown size={14} /> Show {methods.length - 4} more
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {source && method && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mt-8">
                        <button onClick={handleNextStep} className="btn-primary text-sm flex items-center gap-2 px-6">
                          Continue <ArrowRight size={16} />
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Objective + Summary + Launch */}
                {missionStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                    <div className="text-center mb-8">
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">03 — Define Objective</h2>
                      <p className="text-muted-foreground mt-2">What should the AI discover?</p>
                    </div>
                    <div className="max-w-xl mx-auto space-y-3 mb-8">
                      {objectives.map((o, i) => (
                        <SelectionCard key={o.label} icon={o.icon} label={o.label} description={o.desc}
                          selected={objective === o.label} onClick={() => setObjective(o.label)} delay={i * 0.03} />
                      ))}
                    </div>

                    {/* Mission Preview */}
                    {domain && source && method && objective && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl mx-auto glass-card p-5 mb-8">
                        <p className="eyebrow mb-3" style={{ fontSize: '10px' }}>Mission Preview</p>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "Domain", value: domain },
                            { label: "Source", value: source },
                            { label: "Method", value: method },
                            { label: "Objective", value: objective },
                          ].map((item) => (
                            <div key={item.label}>
                              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                              <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Launch button */}
                    <div className="flex justify-center">
                      <motion.button
                        onClick={handleLaunch}
                        disabled={!canLaunch}
                        whileHover={canLaunch ? { scale: 1.03 } : {}}
                        whileTap={canLaunch ? { scale: 0.96 } : {}}
                        className="btn-primary gradient-sweep text-base flex items-center gap-3 w-full max-w-[400px] justify-center rounded-2xl"
                        style={{ height: 56 }}
                      >
                        LAUNCH RESEARCH MISSION
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Back button */}
              {missionStep > 0 && (
                <div className="flex justify-center mt-6">
                  <button onClick={handlePrevStep} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                </div>
              )}

              {/* Status + Feed at bottom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <SystemStatus />
                <GlobalFeed />
              </div>

              {discoveries.length > 0 && (
                <div className="mt-8">
                  <DiscoveryArchive discoveries={discoveries} />
                </div>
              )}
            </motion.div>
          )}

          {/* REASONING PHASE */}
          {phase === "reasoning" && (
            <motion.div key="reasoning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ReasoningAnimation onComplete={handleReasoningComplete} />
            </motion.div>
          )}

          {/* INSIGHT PHASE — Cinematic Discovery Reveal */}
          {phase === "insight" && currentInsight && (
            <motion.div
              key="insight"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="max-w-[600px] mx-auto pt-8"
            >
              {/* Breakthrough banner */}
              {isBreakthrough && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-warning/10 text-warning border border-warning/30">
                    <Zap size={14} /> Breakthrough Pattern — 2× Score
                  </span>
                </motion.div>
              )}

              <p className="eyebrow text-center mb-5">Discovery Detected</p>

              {/* Discovery Card */}
              <div className={`glass-card p-6 md:p-8 border ${rarityBorderColor[currentInsight.rarity] || 'border-border'}`}
                style={currentInsight.rarity === 'legendary' || currentInsight.rarity === 'mythic' ? {
                  boxShadow: `0 0 40px ${getRarityColor(currentInsight.rarity)}20`
                } : {}}>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                    style={{
                      color: getRarityColor(currentInsight.rarity),
                      background: `${getRarityColor(currentInsight.rarity)}12`,
                      borderColor: `${getRarityColor(currentInsight.rarity)}30`,
                    }}>
                    {currentInsight.rarity === 'legendary' ? (
                      <span className="shimmer-gold">{getRarityLabel(currentInsight.rarity)}</span>
                    ) : getRarityLabel(currentInsight.rarity)}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                    {currentInsight.impact}
                  </span>
                  <span className="text-[11px] text-muted-foreground ml-auto font-mono">
                    {currentInsight.confidence}%
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5 tracking-tight">
                  {currentInsight.title}
                </h3>

                <div className="mb-5">
                  <p className="eyebrow mb-2" style={{ fontSize: '10px' }}>Hypothesis</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{currentInsight.hypothesis}</p>
                </div>

                <div className="mb-6">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 font-mono">Research Insight</p>
                  <p className="text-sm text-foreground/50 leading-relaxed">{currentInsight.insight}</p>
                </div>

                {/* Confidence bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <span className="text-xs font-bold text-foreground font-mono">{currentInsight.confidence}%</span>
                  </div>
                  <div className="h-[2px] rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentInsight.confidence}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, hsl(220 90% 56%), hsl(261 85% 60%))' }}
                    />
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground/40 font-mono">
                  Generated by ApeironAI Reality Lab
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
                <motion.button onClick={handleReset} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                  className="btn-primary text-sm flex items-center justify-center gap-2 rounded-xl">
                  <RotateCcw size={14} /> Run Another Mission
                </motion.button>
                <button onClick={() => setShowCollection(true)}
                  className="px-5 py-3 rounded-xl text-sm font-semibold bg-secondary text-foreground hover:bg-border transition-colors flex items-center justify-center gap-2">
                  <BookOpen size={14} /> Archive ({stats.collectedInsights.length}/48)
                </button>
                <a href="https://ai.cherazen.com" target="_blank" rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl text-sm font-semibold bg-secondary text-foreground hover:bg-border transition-colors flex items-center justify-center gap-2">
                  Explore ApeironAI <ExternalLink size={14} />
                </a>
              </div>

              {discoveries.length > 0 && (
                <div className="mt-10">
                  <DiscoveryArchive discoveries={discoveries} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 py-2 px-5" style={{ background: 'hsl(228 27% 5% / 0.9)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
            <span className="text-[10px] text-success font-semibold font-mono">SYSTEM ONLINE</span>
          </div>
          <p className="text-[10px] text-muted-foreground/30 font-mono hidden sm:block">
            ApeironAI Reality Lab
          </p>
        </div>
      </footer>
      <div className="h-10" />
    </div>
  );
};

export default DiscoveryLab;
