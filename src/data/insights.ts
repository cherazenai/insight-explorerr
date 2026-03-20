export interface InsightData {
  id: string;
  title: string;
  hypothesis: string;
  insight: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
  category: string;
  points: number;
  confidence: number;
  impact: "Low" | "Moderate" | "High" | "Breakthrough" | "Paradigm Shift";
  isBreakthrough?: boolean;
}

export interface PlayerStats {
  score: number;
  level: number;
  xp: number;
  xpToNext: number;
  totalDiscoveries: number;
  streak: number;
  bestStreak: number;
  breakthroughs: number;
  energy: number;
  maxEnergy: number;
  reputation: number;
  rank: string;
  unlockedDomains: string[];
  collectedInsights: string[];
}

export const RANKS = [
  "Apprentice Researcher",
  "Field Analyst",
  "Senior Investigator",
  "Lead Scientist",
  "Principal Researcher",
  "Research Director",
  "Grand Theorist",
  "Reality Architect",
];

export function getRank(level: number): string {
  if (level >= 21) return RANKS[7];
  if (level >= 16) return RANKS[6];
  if (level >= 11) return RANKS[5];
  if (level >= 9) return RANKS[4];
  if (level >= 7) return RANKS[3];
  if (level >= 5) return RANKS[2];
  if (level >= 3) return RANKS[1];
  return RANKS[0];
}

export const INITIAL_STATS: PlayerStats = {
  score: 0,
  level: 1,
  xp: 0,
  xpToNext: 100,
  totalDiscoveries: 0,
  streak: 0,
  bestStreak: 0,
  breakthroughs: 0,
  energy: 10,
  maxEnergy: 10,
  reputation: 0,
  rank: RANKS[0],
  unlockedDomains: ["Chemistry", "Materials Science", "Energy Technology"],
  collectedInsights: [],
};

export function getXpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function calculateScore(rarity: string, streak: number, isBreakthrough: boolean): number {
  const base = rarity === "mythic" ? 1000 : rarity === "legendary" ? 500 : rarity === "epic" ? 250 : rarity === "rare" ? 150 : 100;
  const streakMultiplier = 1 + Math.min(streak, 10) * 0.1;
  const breakthroughBonus = isBreakthrough ? 2 : 1;
  return Math.floor(base * streakMultiplier * breakthroughBonus);
}

const allInsights: InsightData[] = [
  // Chemistry
  { id: "chem-01", title: "Catalytic Pathway Discovery", hypothesis: "Graph neural networks trained on catalytic reaction datasets may identify new catalyst materials capable of improving hydrogen production efficiency by 40%.", insight: "The system detected relationships between molecular structures and catalytic performance patterns across 1,247 studies.", rarity: "rare", category: "Chemistry", points: 150, confidence: 78, impact: "High" },
  { id: "chem-02", title: "Synthetic Route Optimization", hypothesis: "Symbolic reasoning applied to organic synthesis databases reveals a 3-step pathway to a target molecule, replacing the known 7-step synthesis.", insight: "By analyzing reaction mechanism databases, the system identified compatible intermediate reactions that bypass traditional synthetic bottlenecks.", rarity: "common", category: "Chemistry", points: 100, confidence: 85, impact: "Moderate" },
  { id: "chem-03", title: "Molecular Stability Prediction", hypothesis: "Transformer models predict that a novel class of metastable compounds exhibit unexpected room-temperature stability when doped with rare earth elements.", insight: "Cross-referencing crystallographic databases with thermodynamic simulation data revealed a stabilizing mechanism previously overlooked.", rarity: "epic", category: "Chemistry", points: 250, confidence: 72, impact: "High" },
  { id: "chem-04", title: "Universal Reaction Predictor", hypothesis: "A unified probabilistic model trained on 2M+ reactions can predict novel reaction outcomes with 92% accuracy across all organic chemistry classes.", insight: "The system discovered that reaction selectivity follows a hidden topological pattern in molecular orbital space.", rarity: "legendary", category: "Chemistry", points: 500, confidence: 92, impact: "Breakthrough" },

  // Materials Science
  { id: "mat-01", title: "Novel Catalyst Discovery", hypothesis: "Evolutionary search across material databases identifies a ternary alloy with unprecedented catalytic activity for CO2 reduction.", insight: "Multi-objective optimization converged on a composition space unexplored in existing literature.", rarity: "rare", category: "Materials Science", points: 150, confidence: 74, impact: "High" },
  { id: "mat-02", title: "Self-Healing Polymer Prediction", hypothesis: "Graph neural networks reveal a class of self-healing materials with superior mechanical recovery through dynamic bond networks.", insight: "Cross-referencing molecular topology with stress-strain data identified a novel polymer backbone configuration.", rarity: "common", category: "Materials Science", points: 100, confidence: 81, impact: "Moderate" },
  { id: "mat-03", title: "Room-Temperature Superconductor Lead", hypothesis: "Knowledge graph analysis suggests a hydrogen-rich compound at moderate pressures may exhibit superconductivity above 0°C.", insight: "Pattern analysis across 50 years of superconductor data identified a convergence zone in pressure-composition-temperature space.", rarity: "legendary", category: "Materials Science", points: 500, confidence: 34, impact: "Paradigm Shift" },
  { id: "mat-04", title: "Metamaterial Design", hypothesis: "Evolutionary algorithms designed a photonic metamaterial with negative refractive index across the entire visible spectrum.", insight: "The system iterated through 10M+ topological configurations to find an aperiodic structure with full-spectrum properties.", rarity: "epic", category: "Materials Science", points: 250, confidence: 67, impact: "Breakthrough" },

  // Energy Technology
  { id: "ene-01", title: "Perovskite Stability Breakthrough", hypothesis: "Transformer models analyzing crystal structure data predict a new perovskite composition with 10x improved thermal stability for solar cells.", insight: "Hidden correlations between dopant concentrations and degradation rates suggest an optimal composition range.", rarity: "rare", category: "Energy Technology", points: 150, confidence: 87, impact: "High" },
  { id: "ene-02", title: "Grid Storage Optimization", hypothesis: "Probabilistic reasoning over grid demand patterns reveals an optimal battery deployment strategy reducing energy waste by 23%.", insight: "Temporal analysis of 5-year grid data combined with weather models identifies previously unrecognized demand-supply patterns.", rarity: "common", category: "Energy Technology", points: 100, confidence: 91, impact: "Moderate" },
  { id: "ene-03", title: "Fusion Containment Model", hypothesis: "Symbolic reasoning combined with plasma physics simulation predicts a novel magnetic field configuration for sustained fusion containment.", insight: "The system identified a 7-coil topology that creates self-stabilizing magnetic islands, reducing turbulence by orders of magnitude.", rarity: "legendary", category: "Energy Technology", points: 500, confidence: 28, impact: "Paradigm Shift" },
  { id: "ene-04", title: "Thermoelectric Conversion", hypothesis: "Graph neural networks identify a nanostructured material achieving thermoelectric conversion efficiency approaching the theoretical maximum.", insight: "Quantum confinement effects in a specific lattice arrangement create phonon blocking while maintaining electron transport.", rarity: "epic", category: "Energy Technology", points: 250, confidence: 63, impact: "Breakthrough" },

  // Medicine
  { id: "med-01", title: "Drug Target Identification", hypothesis: "Knowledge graph analysis of protein interaction networks reveals an overlooked binding site on a key oncogenic protein.", insight: "Cross-referencing structural biology data with clinical outcome databases highlighted a conserved epitope across 47 variants.", rarity: "rare", category: "Medicine", points: 150, confidence: 76, impact: "High" },
  { id: "med-02", title: "Biomarker Correlation", hypothesis: "Transformer models processing multi-omics data identify a novel biomarker panel for early-stage pancreatic cancer detection.", insight: "Integration of proteomic, genomic, and metabolomic datasets revealed a 5-marker signature with 94% sensitivity.", rarity: "epic", category: "Medicine", points: 250, confidence: 94, impact: "Breakthrough" },
  { id: "med-03", title: "Universal Antiviral Mechanism", hypothesis: "Probabilistic reasoning across viral evolution data suggests a conserved replication mechanism targetable by a single broad-spectrum antiviral.", insight: "The system identified a structural motif present in 94% of RNA viruses essential for genome replication and druggable.", rarity: "legendary", category: "Medicine", points: 500, confidence: 41, impact: "Paradigm Shift" },
  { id: "med-04", title: "Personalized Dosage Model", hypothesis: "Graph neural networks trained on pharmacokinetic data predict optimal drug dosages based on individual genetic profiles.", insight: "By mapping CYP450 enzyme variants to drug metabolism rates, the system enables precision dosing for 200+ medications.", rarity: "common", category: "Medicine", points: 100, confidence: 88, impact: "Moderate" },

  // Climate Science
  { id: "cli-01", title: "Carbon Sequestration Model", hypothesis: "Probabilistic reasoning over ocean chemistry data predicts a previously unknown carbon sink mechanism in deep Atlantic currents.", insight: "Analysis of 30-year oceanographic datasets combined with atmospheric CO2 models reveals an underestimated absorption pathway.", rarity: "rare", category: "Climate Science", points: 150, confidence: 69, impact: "High" },
  { id: "cli-02", title: "Feedback Loop Detection", hypothesis: "Graph neural networks mapping climate feedback systems identify an amplifying loop between Arctic permafrost thaw and jet stream behavior.", insight: "The system traced cascading effects through 12 interconnected climate subsystems, revealing a critical tipping point threshold.", rarity: "epic", category: "Climate Science", points: 250, confidence: 58, impact: "Breakthrough" },
  { id: "cli-03", title: "Geoengineering Safety Model", hypothesis: "Symbolic reasoning over atmospheric chemistry models proves a specific stratospheric aerosol injection pattern avoids ozone depletion.", insight: "The system formally verified safety constraints across 10,000 climate scenarios spanning different injection parameters.", rarity: "legendary", category: "Climate Science", points: 500, confidence: 45, impact: "Paradigm Shift" },
  { id: "cli-04", title: "Methane Emission Tracking", hypothesis: "Transformer models analyzing satellite imagery and ground sensor data pinpoint methane super-emitter sources with 98% accuracy.", insight: "Multi-modal data fusion reveals characteristic spectral-temporal signatures unique to different emission source types.", rarity: "common", category: "Climate Science", points: 100, confidence: 98, impact: "Moderate" },

  // Aerospace
  { id: "aero-01", title: "Thermal Shield Innovation", hypothesis: "Evolutionary search across ceramic material databases suggests a composite heat shield material with 60% weight reduction.", insight: "Multi-objective optimization across thermal, mechanical, and density parameters converged on an untested ceramic-metal matrix.", rarity: "rare", category: "Aerospace", points: 150, confidence: 71, impact: "High" },
  { id: "aero-02", title: "Propulsion Efficiency", hypothesis: "Simulation-driven reasoning predicts an optimized nozzle geometry improving specific impulse by 8% in vacuum conditions.", insight: "Computational fluid dynamics combined with topology optimization identified a non-intuitive internal geometry.", rarity: "common", category: "Aerospace", points: 100, confidence: 83, impact: "Moderate" },
  { id: "aero-03", title: "Orbital Debris Solution", hypothesis: "Graph neural networks modeling orbital mechanics predict an optimal debris removal sequence clearing 80% of critical-zone objects.", insight: "The system computed Pareto-optimal capture trajectories accounting for gravitational perturbations and fuel constraints.", rarity: "epic", category: "Aerospace", points: 250, confidence: 62, impact: "Breakthrough" },
  { id: "aero-04", title: "Interstellar Propulsion Theory", hypothesis: "Symbolic reasoning over quantum field theory suggests a mechanism for propulsive force from quantum vacuum fluctuations.", insight: "The system derived a mathematical framework linking Casimir effect modifications to directional momentum transfer.", rarity: "legendary", category: "Aerospace", points: 500, confidence: 12, impact: "Paradigm Shift" },

  // Quantum Physics
  { id: "qp-01", title: "Quantum Error Correction", hypothesis: "Reinforcement learning discovers a topological error correction code reducing qubit overhead by 75% for fault-tolerant quantum computing.", insight: "The agent explored 10B+ code configurations and found a surface code variant with exceptional noise resilience.", rarity: "epic", category: "Quantum Physics", points: 250, confidence: 66, impact: "Breakthrough" },
  { id: "qp-02", title: "Entanglement Network Protocol", hypothesis: "Graph neural networks design an optimal quantum network topology for continental-scale quantum key distribution.", insight: "Analysis of fiber loss models and satellite link budgets reveals a hybrid architecture minimizing decoherence.", rarity: "rare", category: "Quantum Physics", points: 150, confidence: 73, impact: "High" },
  { id: "qp-03", title: "Quantum Gravity Signature", hypothesis: "Transformer models processing gravitational wave data identify subtle signatures consistent with loop quantum gravity predictions.", insight: "Cross-correlation of LIGO/Virgo datasets with theoretical templates reveals anomalous phase shifts at Planck-scale energies.", rarity: "mythic", category: "Quantum Physics", points: 1000, confidence: 8, impact: "Paradigm Shift" },
  { id: "qp-04", title: "Quantum Simulation Speedup", hypothesis: "Hybrid AI systems optimize variational quantum eigensolvers to simulate molecular systems 100x faster than classical methods.", insight: "The system discovered a novel ansatz structure that dramatically reduces circuit depth while maintaining chemical accuracy.", rarity: "common", category: "Quantum Physics", points: 100, confidence: 89, impact: "Moderate" },

  // Biotechnology
  { id: "bio-01", title: "CRISPR Efficiency Enhancement", hypothesis: "Transformer models predict guide RNA sequences with 99% on-target efficiency and minimal off-target effects.", insight: "Deep learning on 500K+ editing outcomes revealed sequence-structure features governing Cas9 binding specificity.", rarity: "rare", category: "Biotechnology", points: 150, confidence: 91, impact: "High" },
  { id: "bio-02", title: "Synthetic Organism Design", hypothesis: "Evolutionary algorithms design a minimal synthetic genome capable of producing industrial enzymes at 50x natural yields.", insight: "Systematic pathway optimization removed 40% of non-essential genes while adding synthetic regulatory circuits.", rarity: "epic", category: "Biotechnology", points: 250, confidence: 55, impact: "Breakthrough" },
  { id: "bio-03", title: "Universal Protein Folding", hypothesis: "A hybrid AI system predicts protein folding for intrinsically disordered proteins, previously considered computationally intractable.", insight: "Combining graph neural networks with molecular dynamics simulations captures conformational ensemble distributions.", rarity: "legendary", category: "Biotechnology", points: 500, confidence: 42, impact: "Paradigm Shift" },
  { id: "bio-04", title: "Microbiome Therapeutics", hypothesis: "Probabilistic reasoning over gut microbiome datasets identifies optimal bacterial consortia for treating inflammatory bowel disease.", insight: "The system mapped metabolic dependencies between 200+ bacterial species to design a stable therapeutic community.", rarity: "common", category: "Biotechnology", points: 100, confidence: 79, impact: "Moderate" },

  // Artificial Intelligence
  { id: "ai-01", title: "Emergent Reasoning Patterns", hypothesis: "Symbolic reasoning over transformer architectures reveals that chain-of-thought emerges from specific attention head geometries.", insight: "Analysis of 1000+ model checkpoints shows reasoning capability correlates with a topological signature in attention patterns.", rarity: "epic", category: "Artificial Intelligence", points: 250, confidence: 61, impact: "Breakthrough" },
  { id: "ai-02", title: "Self-Improving Architecture", hypothesis: "Reinforcement learning discovers a neural architecture that autonomously optimizes its own topology during training.", insight: "The system converged on a dynamic pruning-growth cycle that maintains performance while reducing parameters by 60%.", rarity: "legendary", category: "Artificial Intelligence", points: 500, confidence: 37, impact: "Paradigm Shift" },
  { id: "ai-03", title: "Causal Reasoning Module", hypothesis: "Graph neural networks combined with symbolic reasoning enable language models to distinguish correlation from causation.", insight: "A dedicated causal attention mechanism learns interventional distributions from observational data.", rarity: "rare", category: "Artificial Intelligence", points: 150, confidence: 68, impact: "High" },
  { id: "ai-04", title: "Transfer Learning Optimization", hypothesis: "Probabilistic models identify optimal pre-training data mixtures that maximize downstream task performance across 50+ benchmarks.", insight: "Data curriculum learning with dynamic reweighting outperforms static mixture strategies by 15% on average.", rarity: "common", category: "Artificial Intelligence", points: 100, confidence: 82, impact: "Moderate" },

  // Neuroscience
  { id: "neuro-01", title: "Consciousness Correlate", hypothesis: "Transformer models processing EEG and fMRI data identify a neural signature that distinguishes conscious from unconscious processing.", insight: "A specific spatiotemporal pattern in gamma oscillations correlates with subjective awareness across 10,000+ sessions.", rarity: "mythic", category: "Neuroscience", points: 1000, confidence: 15, impact: "Paradigm Shift" },
  { id: "neuro-02", title: "Memory Consolidation Model", hypothesis: "Graph neural networks reveal that sleep-dependent memory consolidation follows a predictable replay sequence optimized for generalization.", insight: "Analysis of hippocampal-cortical coupling during sleep stages shows a compression algorithm for episodic memories.", rarity: "epic", category: "Neuroscience", points: 250, confidence: 57, impact: "Breakthrough" },
  { id: "neuro-03", title: "Neural Plasticity Predictor", hypothesis: "Reinforcement learning models predict optimal stimulation protocols for maximizing neuroplasticity in stroke recovery.", insight: "Personalized TMS protocols based on individual connectome data improve motor recovery outcomes by 40%.", rarity: "rare", category: "Neuroscience", points: 150, confidence: 74, impact: "High" },
  { id: "neuro-04", title: "Synaptic Pruning Algorithm", hypothesis: "Evolutionary search discovers that developmental synaptic pruning follows an optimal information-theoretic compression scheme.", insight: "The pruning pattern maximizes mutual information between sensory inputs and internal representations.", rarity: "common", category: "Neuroscience", points: 100, confidence: 80, impact: "Moderate" },

  // Astrophysics
  { id: "astro-01", title: "Dark Matter Distribution", hypothesis: "Graph neural networks trained on gravitational lensing data predict dark matter distribution with unprecedented resolution.", insight: "The model reveals filamentary structures connecting galaxy clusters that match N-body simulation predictions.", rarity: "epic", category: "Astrophysics", points: 250, confidence: 53, impact: "Breakthrough" },
  { id: "astro-02", title: "Exoplanet Habitability Index", hypothesis: "Probabilistic reasoning creates a multi-factor habitability score that identifies 17 previously overlooked potentially habitable exoplanets.", insight: "Combining atmospheric spectra, stellar variability, and tidal heating models reveals a broader habitable zone.", rarity: "rare", category: "Astrophysics", points: 150, confidence: 64, impact: "High" },
  { id: "astro-03", title: "Pre-Big Bang Signal", hypothesis: "Transformer models analyzing cosmic microwave background data detect statistical anomalies consistent with a cyclic cosmology model.", insight: "Concentric temperature rings in CMB data match predictions of conformal cyclic cosmology at 3.2σ significance.", rarity: "mythic", category: "Astrophysics", points: 1000, confidence: 6, impact: "Paradigm Shift" },
  { id: "astro-04", title: "Fast Radio Burst Decoder", hypothesis: "Symbolic reasoning identifies repeating sub-structures in FRB signals suggesting a natural but non-random emission mechanism.", insight: "Frequency-time waterfall analysis reveals fractal patterns consistent with magnetar crustal oscillation modes.", rarity: "common", category: "Astrophysics", points: 100, confidence: 77, impact: "Moderate" },

  // Nanotechnology
  { id: "nano-01", title: "Molecular Machine Design", hypothesis: "Evolutionary algorithms design a molecular motor with directional rotation at near-theoretical efficiency.", insight: "The system optimized ratchet-like molecular geometries from 1M+ candidates to achieve unidirectional motion.", rarity: "epic", category: "Nanotechnology", points: 250, confidence: 59, impact: "Breakthrough" },
  { id: "nano-02", title: "Nanoparticle Drug Delivery", hypothesis: "Graph neural networks optimize nanoparticle surface chemistry for targeted delivery to pancreatic tumor cells.", insight: "A specific peptide-lipid coating combination achieves 95% tumor specificity with minimal healthy tissue accumulation.", rarity: "rare", category: "Nanotechnology", points: 150, confidence: 82, impact: "High" },
  { id: "nano-03", title: "Self-Assembling Nanostructure", hypothesis: "Symbolic reasoning predicts DNA origami designs that self-assemble into functional nanoscale computing elements.", insight: "The system derived folding paths that create logic gates from Watson-Crick base pairing without external scaffolding.", rarity: "legendary", category: "Nanotechnology", points: 500, confidence: 48, impact: "Paradigm Shift" },
  { id: "nano-04", title: "Quantum Dot Optimization", hypothesis: "Transformer models predict quantum dot compositions with tunable emission spanning UV to near-infrared with 99% quantum yield.", insight: "Composition-size-ligand relationships follow a latent manifold that enables precise spectral engineering.", rarity: "common", category: "Nanotechnology", points: 100, confidence: 86, impact: "Moderate" },
];

// Breakthrough combos
const breakthroughCombos = [
  { domain: "Materials Science", source: "Knowledge Graph", method: "Graph Neural Networks", objective: "Discover New Materials" },
  { domain: "Chemistry", source: "Simulation Data", method: "Symbolic Reasoning", objective: "Identify Hidden Relationships" },
  { domain: "Medicine", source: "Scientific Papers", method: "Transformer Models", objective: "Generate Hypothesis" },
  { domain: "Energy Technology", source: "Experimental Datasets", method: "Evolutionary Algorithms", objective: "Design Experiment" },
  { domain: "Climate Science", source: "Knowledge Graph", method: "Probabilistic Reasoning", objective: "Predict Experimental Outcome" },
  { domain: "Aerospace", source: "Simulation Data", method: "Evolutionary Algorithms", objective: "Discover New Materials" },
  { domain: "Quantum Physics", source: "Simulation Data", method: "Reinforcement Learning", objective: "Identify Hidden Relationships" },
  { domain: "Biotechnology", source: "Experimental Datasets", method: "Transformer Models", objective: "Generate Hypothesis" },
  { domain: "Artificial Intelligence", source: "Knowledge Graph", method: "Hybrid AI Systems", objective: "Identify Hidden Relationships" },
  { domain: "Neuroscience", source: "Experimental Datasets", method: "Graph Neural Networks", objective: "Generate Hypothesis" },
  { domain: "Astrophysics", source: "Simulation Data", method: "Transformer Models", objective: "Predict Experimental Outcome" },
  { domain: "Nanotechnology", source: "Simulation Data", method: "Evolutionary Algorithms", objective: "Discover New Materials" },
];

export function isBreakthroughCombo(domain: string, source: string, method: string, objective: string): boolean {
  return breakthroughCombos.some(
    (c) => c.domain === domain && c.source === source && c.method === method && c.objective === objective
  );
}

export function getInsight(domain: string, runCount: number, isBreakthrough: boolean): InsightData {
  const domainInsights = allInsights.filter((i) => i.category === domain);
  if (domainInsights.length === 0) return allInsights[0];

  if (isBreakthrough) {
    const best = domainInsights.find((i) => i.rarity === "mythic") || domainInsights.find((i) => i.rarity === "legendary");
    if (best) return { ...best, isBreakthrough: true };
  }

  return domainInsights[runCount % domainInsights.length];
}

export function getAllInsights(): InsightData[] {
  return allInsights;
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "mythic": return "#EF4444";
    case "legendary": return "#F59E0B";
    case "epic": return "#A78BFA";
    case "rare": return "#4F8EF7";
    default: return "#8B93A7";
  }
}

export function getRarityLabel(rarity: string): string {
  switch (rarity) {
    case "mythic": return "MYTHIC";
    case "legendary": return "LEGENDARY";
    case "epic": return "EPIC";
    case "rare": return "RARE";
    default: return "COMMON";
  }
}

export function getImpactColor(impact: string): string {
  switch (impact) {
    case "Paradigm Shift": return "#EF4444";
    case "Breakthrough": return "#F59E0B";
    case "High": return "#A78BFA";
    case "Moderate": return "#4F8EF7";
    default: return "#8B93A7";
  }
}
