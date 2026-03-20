import { motion } from "framer-motion";
import { ArrowRight, Gem, Microscope, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import ParticleField from "@/components/ParticleField";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleField />

      {/* Nebula glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full nebula-bg"
          style={{
            left: '50%', top: '40%', transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(79,142,247,0.1) 0%, rgba(123,92,240,0.06) 30%, transparent 60%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="ApeironAI" className="w-9 h-9 rounded-xl" />
          <span className="font-display text-sm font-semibold text-foreground">ApeironAI</span>
        </div>
        <a
          href="https://ai.cherazen.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
        >
          Explore Platform →
        </a>
      </header>

      {/* Hero */}
      <main className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="pt-16 md:pt-28 pb-20 md:pb-32 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" />
            <span className="text-xs text-primary font-mono">Reality Engine Online</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-[56px] font-bold text-foreground leading-[1.1] tracking-tight max-w-3xl mx-auto"
          >
            Discover What Science{" "}
            <span className="text-primary">Hasn't Yet</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed"
          >
            ApeironAI Reality Lab — Where AI explores the frontiers of human knowledge
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
          >
            <motion.button
              onClick={() => navigate("/lab")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary gradient-sweep text-base px-8 py-4 inline-flex items-center gap-3 rounded-2xl"
            >
              Begin Research Mission
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Preview Cards */}
        <div className="relative max-w-4xl mx-auto pb-20 hidden md:block">
          <div className="flex justify-center gap-8">
            {/* Left card - Discovery preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="animate-float glass-card p-5 w-[300px]"
              style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-warning/15 text-warning border border-warning/30">
                  LEGENDARY
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-destructive/15 text-destructive">
                  Paradigm Shift
                </span>
              </div>
              <h4 className="font-display text-base font-bold text-foreground mb-2">Fusion Containment Model</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Novel magnetic field configuration for sustained fusion containment predicted...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-mono">Confidence: 28%</span>
                <span className="text-xs font-bold text-warning font-mono">+1000 pts</span>
              </div>
            </motion.div>

            {/* Right card - Processing preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="animate-float-delayed glass-card p-5 w-[280px] mt-8"
              style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}
            >
              <p className="eyebrow mb-3" style={{ fontSize: '9px' }}>Reality Engine</p>
              {["Initializing Neural Network", "Parsing Database", "Running Hypothesis Engine", "Classifying Discovery"].map((step, i) => (
                <div key={step} className="flex items-center gap-2.5 py-1.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
                    i < 3 ? "bg-success/20 text-success" : "bg-primary/15 text-primary"
                  }`}>
                    {i < 3 ? "✓" : "…"}
                  </div>
                  <span className={`text-xs ${i < 3 ? "text-foreground/60" : "text-foreground"}`}>{step}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x divide-border pb-20"
        >
          {[
            { icon: Gem, value: "48", label: "Possible Discoveries" },
            { icon: Microscope, value: "10", label: "Scientific Domains" },
            { icon: Trophy, value: "8", label: "Rank Tiers" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 px-8">
              <stat.icon size={20} className="text-primary/60" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-8">
        <p className="text-[11px] text-muted-foreground/40 font-mono">
          ApeironAI Reality Lab · Powered by Cherazen Research Systems
        </p>
      </footer>
    </div>
  );
};

export default Index;
