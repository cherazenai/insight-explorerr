export interface InsightData {
  id: string;
  title: string;
  hypothesis: string;
  insight: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: string;
  points: number;
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
  unlockedDomains: string[];
  collectedInsights: string[];
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
  unlockedDomains: ["Chemistry", "Materials Science", "Energy Technology"],
  collectedInsights: [],
};

export function getXpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function calculateScore(rarity: string, streak: number, isBreakthrough: boolean): number {
  const base = rarity === "legendary" ? 500 : rarity === "epic" ? 250 : rarity === "rare" ? 150 : 100;
  const streakMultiplier = 1 + Math.min(streak, 10) * 0.1;
  const breakthroughBonus = isBreakthrough ? 2 : 1;
  return Math.floor(base * streakMultiplier * breakthroughBonus);
}

const allInsights: InsightData[] = [
  // Chemistry
  { id: "chem-01", title: "Catalytic Pathway Discovery", hypothesis: "Graph neural networks trained on catalytic reaction datasets may identify new catalyst materials capable of improving hydrogen production efficiency by 40%.", insight: "The system detected relationships between molecular structures and catalytic performance patterns across 1,247 studies.", rarity: "rare", category: "Chemistry", points: 150 },
  { id: "chem-02", title: "Synthetic Route Optimization", hypothesis: "Symbolic reasoning applied to organic synthesis databases reveals a 3-step pathway to a target molecule, replacing the known 7-step synthesis.", insight: "By analyzing reaction mechanism databases, the system identified compatible intermediate reactions that bypass traditional synthetic bottlenecks.", rarity: "common", category: "Chemistry", points: 100 },
  { id: "chem-03", title: "Molecular Stability Prediction", hypothesis: "Transformer models predict that a novel class of metastable compounds exhibit unexpected room-temperature stability when doped with rare earth elements.", insight: "Cross-referencing crystallographic databases with thermodynamic simulation data revealed a stabilizing mechanism previously overlooked.", rarity: "epic", category: "Chemistry", points: 250 },
  { id: "chem-04", title: "Universal Reaction Predictor", hypothesis: "A unified probabilistic model trained on 2M+ reactions can predict novel reaction outcomes with 92% accuracy across all organic chemistry classes.", insight: "The system discovered that reaction selectivity follows a hidden topological pattern in molecular orbital space that transcends traditional classification.", rarity: "legendary", category: "Chemistry", points: 500 },

  // Materials Science
  { id: "mat-01", title: "Novel Catalyst Discovery", hypothesis: "Evolutionary search across material databases identifies a ternary alloy with unprecedented catalytic activity for CO2 reduction.", insight: "Multi-objective optimization converged on a composition space unexplored in existing literature.", rarity: "rare", category: "Materials Science", points: 150 },
  { id: "mat-02", title: "Self-Healing Polymer Prediction", hypothesis: "Graph neural networks reveal a class of self-healing materials with superior mechanical recovery properties through dynamic bond networks.", insight: "Cross-referencing molecular topology with stress-strain data identified a novel polymer backbone configuration.", rarity: "common", category: "Materials Science", points: 100 },
  { id: "mat-03", title: "Room-Temperature Superconductor Lead", hypothesis: "Knowledge graph analysis suggests a specific hydrogen-rich compound at moderate pressures may exhibit superconductivity above 0°C.", insight: "Pattern analysis across 50 years of superconductor data identified a convergence zone in pressure-composition-temperature space.", rarity: "legendary", category: "Materials Science", points: 500 },
  { id: "mat-04", title: "Metamaterial Design", hypothesis: "Evolutionary algorithms designed a photonic metamaterial with negative refractive index across the entire visible spectrum.", insight: "The system iterated through 10M+ topological configurations to find an aperiodic structure with full-spectrum properties.", rarity: "epic", category: "Materials Science", points: 250 },

  // Energy Technology
  { id: "ene-01", title: "Perovskite Stability Breakthrough", hypothesis: "Transformer models analyzing crystal structure data predict a new perovskite composition with 10x improved thermal stability for solar cells.", insight: "Hidden correlations between dopant concentrations and degradation rates suggest an optimal composition range.", rarity: "rare", category: "Energy Technology", points: 150 },
  { id: "ene-02", title: "Grid Storage Optimization", hypothesis: "Probabilistic reasoning over grid demand patterns reveals an optimal battery deployment strategy reducing energy waste by 23%.", insight: "Temporal analysis of 5-year grid data combined with weather models identifies previously unrecognized demand-supply patterns.", rarity: "common", category: "Energy Technology", points: 100 },
  { id: "ene-03", title: "Fusion Containment Model", hypothesis: "Symbolic reasoning combined with plasma physics simulation predicts a novel magnetic field configuration for sustained fusion plasma containment.", insight: "The system identified a 7-coil topology that creates self-stabilizing magnetic islands, reducing turbulence by orders of magnitude.", rarity: "legendary", category: "Energy Technology", points: 500 },
  { id: "ene-04", title: "Thermoelectric Conversion", hypothesis: "Graph neural networks identify a nanostructured material that achieves thermoelectric conversion efficiency approaching the theoretical maximum.", insight: "Quantum confinement effects in a specific lattice arrangement create phonon blocking while maintaining electron transport.", rarity: "epic", category: "Energy Technology", points: 250 },

  // Medicine
  { id: "med-01", title: "Drug Target Identification", hypothesis: "Knowledge graph analysis of protein interaction networks reveals an overlooked binding site on a key oncogenic protein.", insight: "Cross-referencing structural biology data with clinical outcome databases highlighted a conserved epitope across 47 variants.", rarity: "rare", category: "Medicine", points: 150 },
  { id: "med-02", title: "Biomarker Correlation", hypothesis: "Transformer models processing multi-omics data identify a novel biomarker panel for early-stage pancreatic cancer detection.", insight: "Integration of proteomic, genomic, and metabolomic datasets revealed a 5-marker signature with 94% sensitivity.", rarity: "epic", category: "Medicine", points: 250 },
  { id: "med-03", title: "Universal Antiviral Mechanism", hypothesis: "Probabilistic reasoning across viral evolution data suggests a conserved replication mechanism targetable by a single broad-spectrum antiviral.", insight: "The system identified a structural motif present in 94% of RNA viruses that is essential for genome replication and druggable.", rarity: "legendary", category: "Medicine", points: 500 },
  { id: "med-04", title: "Personalized Dosage Model", hypothesis: "Graph neural networks trained on pharmacokinetic data predict optimal drug dosages based on individual genetic profiles.", insight: "By mapping CYP450 enzyme variants to drug metabolism rates, the system enables precision dosing for 200+ medications.", rarity: "common", category: "Medicine", points: 100 },

  // Climate Science
  { id: "cli-01", title: "Carbon Sequestration Model", hypothesis: "Probabilistic reasoning over ocean chemistry data predicts a previously unknown carbon sink mechanism in deep Atlantic currents.", insight: "Analysis of 30-year oceanographic datasets combined with atmospheric CO2 models reveals an underestimated absorption pathway.", rarity: "rare", category: "Climate Science", points: 150 },
  { id: "cli-02", title: "Feedback Loop Detection", hypothesis: "Graph neural networks mapping climate feedback systems identify an amplifying loop between Arctic permafrost thaw and jet stream behavior.", insight: "The system traced cascading effects through 12 interconnected climate subsystems, revealing a critical tipping point threshold.", rarity: "epic", category: "Climate Science", points: 250 },
  { id: "cli-03", title: "Geoengineering Safety Model", hypothesis: "Symbolic reasoning over atmospheric chemistry models proves that a specific stratospheric aerosol injection pattern avoids ozone depletion side effects.", insight: "The system formally verified safety constraints across 10,000 climate scenarios spanning different injection parameters.", rarity: "legendary", category: "Climate Science", points: 500 },
  { id: "cli-04", title: "Methane Emission Tracking", hypothesis: "Transformer models analyzing satellite imagery and ground sensor data can pinpoint methane super-emitter sources with 98% accuracy.", insight: "Multi-modal data fusion reveals characteristic spectral-temporal signatures unique to different emission source types.", rarity: "common", category: "Climate Science", points: 100 },

  // Aerospace
  { id: "aero-01", title: "Thermal Shield Innovation", hypothesis: "Evolutionary search across ceramic material databases suggests a composite heat shield material with 60% weight reduction.", insight: "Multi-objective optimization across thermal, mechanical, and density parameters converged on an untested ceramic-metal matrix.", rarity: "rare", category: "Aerospace", points: 150 },
  { id: "aero-02", title: "Propulsion Efficiency", hypothesis: "Simulation-driven reasoning predicts an optimized nozzle geometry that improves specific impulse by 8% in vacuum conditions.", insight: "Computational fluid dynamics combined with topology optimization identified a non-intuitive internal geometry.", rarity: "common", category: "Aerospace", points: 100 },
  { id: "aero-03", title: "Orbital Debris Solution", hypothesis: "Graph neural networks modeling orbital mechanics predict an optimal debris removal sequence that clears 80% of critical-zone objects in 5 years.", insight: "The system computed Pareto-optimal capture trajectories accounting for gravitational perturbations and fuel constraints.", rarity: "epic", category: "Aerospace", points: 250 },
  { id: "aero-04", title: "Interstellar Propulsion Theory", hypothesis: "Symbolic reasoning over quantum field theory suggests a mechanism for generating propulsive force from quantum vacuum fluctuations.", insight: "The system derived a consistent mathematical framework linking Casimir effect modifications to directional momentum transfer.", rarity: "legendary", category: "Aerospace", points: 500 },
];

// Breakthrough combos
const breakthroughCombos = [
  { domain: "Materials Science", source: "Knowledge Graph", method: "Graph Neural Networks", objective: "Discover New Materials" },
  { domain: "Chemistry", source: "Simulation Data", method: "Symbolic Reasoning", objective: "Identify Hidden Relationships" },
  { domain: "Medicine", source: "Scientific Papers", method: "Transformer Models", objective: "Generate Hypothesis" },
  { domain: "Energy Technology", source: "Experimental Datasets", method: "Evolutionary Search", objective: "Design Experiment" },
  { domain: "Climate Science", source: "Knowledge Graph", method: "Probabilistic Reasoning", objective: "Predict Experimental Outcome" },
  { domain: "Aerospace", source: "Simulation Data", method: "Evolutionary Search", objective: "Discover New Materials" },
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
    // Return the legendary or best one for breakthroughs
    const legendary = domainInsights.find((i) => i.rarity === "legendary");
    if (legendary) return { ...legendary, isBreakthrough: true };
  }

  // Cycle through insights, preferring ones not yet seen
  return domainInsights[runCount % domainInsights.length];
}

export function getAllInsights(): InsightData[] {
  return allInsights;
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "legendary": return "#FFD700";
    case "epic": return "#FF4DA6";
    case "rare": return "#7B5CFF";
    default: return "#1DE9B6";
  }
}

export function getRarityLabel(rarity: string): string {
  switch (rarity) {
    case "legendary": return "LEGENDARY";
    case "epic": return "EPIC";
    case "rare": return "RARE";
    default: return "COMMON";
  }
}
