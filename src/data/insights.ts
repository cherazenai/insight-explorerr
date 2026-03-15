export interface InsightData {
  title: string;
  hypothesis: string;
  insight: string;
  isBreakthrough?: boolean;
}

const insightsByDomain: Record<string, InsightData[]> = {
  "Materials Science": [
    {
      title: "Novel Catalyst Discovery",
      hypothesis: "Graph neural networks trained on catalytic reaction datasets may identify new catalyst materials capable of improving hydrogen production efficiency by 40%.",
      insight: "The system detected relationships between molecular structures and catalytic performance patterns across 1,247 studies, suggesting three untested material combinations.",
    },
    {
      title: "Self-Healing Polymer Prediction",
      hypothesis: "Evolutionary search across polymer databases reveals a class of self-healing materials with superior mechanical recovery properties.",
      insight: "Cross-referencing molecular topology with stress-strain data identified a novel polymer backbone configuration not present in existing literature.",
    },
  ],
  "Energy Technology": [
    {
      title: "Perovskite Stability Breakthrough",
      hypothesis: "Transformer models analyzing crystal structure data predict a new perovskite composition with 10x improved thermal stability for solar cells.",
      insight: "Hidden correlations between dopant concentrations and degradation rates suggest an optimal composition range previously unexplored.",
    },
    {
      title: "Grid Storage Optimization",
      hypothesis: "Probabilistic reasoning over grid demand patterns reveals an optimal battery deployment strategy reducing energy waste by 23%.",
      insight: "Temporal analysis of 5-year grid data combined with weather models identifies previously unrecognized demand-supply synchronization opportunities.",
    },
  ],
  "Chemistry": [
    {
      title: "Catalytic Pathway Discovery",
      hypothesis: "Graph neural networks trained on catalytic reaction datasets may identify new catalyst materials capable of improving hydrogen production efficiency.",
      insight: "The system detected relationships between molecular structures and catalytic performance patterns across multiple studies, suggesting potential materials worth testing.",
    },
    {
      title: "Synthetic Route Optimization",
      hypothesis: "Symbolic reasoning applied to organic synthesis databases reveals a 3-step pathway to a target molecule, replacing the known 7-step synthesis.",
      insight: "By analyzing reaction mechanism databases, the system identified compatible intermediate reactions that bypass traditional synthetic bottlenecks.",
    },
  ],
  "Medicine": [
    {
      title: "Drug Target Identification",
      hypothesis: "Knowledge graph analysis of protein interaction networks reveals an overlooked binding site on the SARS-CoV-2 spike protein variant.",
      insight: "Cross-referencing structural biology data with clinical outcome databases highlighted a conserved epitope across 47 variants.",
    },
    {
      title: "Biomarker Correlation",
      hypothesis: "Transformer models processing multi-omics data identify a novel biomarker panel for early-stage pancreatic cancer detection.",
      insight: "Integration of proteomic, genomic, and metabolomic datasets revealed a 5-marker signature with 94% sensitivity in preliminary analysis.",
    },
  ],
  "Climate Science": [
    {
      title: "Carbon Sequestration Model",
      hypothesis: "Probabilistic reasoning over ocean chemistry data predicts a previously unknown carbon sink mechanism in deep Atlantic currents.",
      insight: "Analysis of 30-year oceanographic datasets combined with atmospheric CO2 models reveals an underestimated absorption pathway.",
    },
    {
      title: "Feedback Loop Detection",
      hypothesis: "Graph neural networks mapping climate feedback systems identify an amplifying loop between Arctic permafrost thaw and jet stream behavior.",
      insight: "The system traced cascading effects through 12 interconnected climate subsystems, revealing a critical tipping point threshold.",
    },
  ],
  "Aerospace": [
    {
      title: "Thermal Shield Innovation",
      hypothesis: "Evolutionary search across ceramic material databases suggests a composite heat shield material with 60% weight reduction at equivalent thermal resistance.",
      insight: "Multi-objective optimization across thermal, mechanical, and density parameters converged on a previously untested ceramic-metal matrix configuration.",
    },
    {
      title: "Propulsion Efficiency",
      hypothesis: "Simulation-driven reasoning predicts an optimized nozzle geometry that improves specific impulse by 8% in vacuum conditions.",
      insight: "Computational fluid dynamics combined with topology optimization identified a non-intuitive internal geometry that reduces boundary layer losses.",
    },
  ],
};

// Breakthrough combinations
const breakthroughCombos: { domain: string; source: string; method: string; objective: string }[] = [
  { domain: "Materials Science", source: "Knowledge Graph", method: "Graph Neural Networks", objective: "Discover New Materials" },
  { domain: "Chemistry", source: "Simulation Data", method: "Symbolic Reasoning", objective: "Identify Hidden Relationships" },
  { domain: "Medicine", source: "Scientific Papers", method: "Transformer Models", objective: "Generate Hypothesis" },
];

export function isBreakthroughCombo(domain: string, source: string, method: string, objective: string): boolean {
  return breakthroughCombos.some(
    (c) => c.domain === domain && c.source === source && c.method === method && c.objective === objective
  );
}

export function getInsight(domain: string, runCount: number): InsightData {
  const domainInsights = insightsByDomain[domain] || insightsByDomain["Chemistry"];
  return domainInsights[runCount % domainInsights.length];
}
