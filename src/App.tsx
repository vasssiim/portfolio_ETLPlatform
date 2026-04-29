import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Database, 
  Workflow, 
  Cpu, 
  Layers, 
  ArrowRight, 
  Zap, 
  Server, 
  ShieldCheck, 
  Activity,
  ChevronRight,
  Info
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  color: string;
}

const stages: Stage[] = [
  {
    id: 'ingestion',
    name: 'Ingestion Layer',
    icon: <Zap className="w-6 h-6" />,
    description: 'Serverless S3/Lambda event-driven ingestion.',
    details: ['Real-time S3 put events', 'Lambda validation/routing', 'Raw data landing zone'],
    color: 'text-blue-400',
  },
  {
    id: 'orchestration',
    name: 'Orchestration',
    icon: <Workflow className="w-6 h-6" />,
    description: 'AWS Step Functions workflow management.',
    details: ['Conditional branching', 'Error handling & retries', 'State machine longevity'],
    color: 'text-purple-400',
  },
  {
    id: 'processing',
    name: 'Hybrid Processing',
    icon: <Cpu className="w-6 h-6" />,
    description: 'AWS Glue ETL and dynamic Amazon EMR clusters.',
    details: ['Glue for serverless Spark', 'EMR for heavy workloads', 'Dynamic provisioning'],
    color: 'text-emerald-400',
  },
  {
    id: 'storage',
    name: 'Medallion Storage',
    icon: <Layers className="w-6 h-6" />,
    description: 'Architected S3 zones for data maturity.',
    details: ['Bronze (Raw)', 'Silver (Transformed)', 'Gold (Business-ready)'],
    color: 'text-amber-400',
  }
];

const Connector = ({ active }: { active: boolean }) => (
  <div className="flex-1 flex justify-center items-center py-4 md:py-0 md:px-4">
    <div className="h-12 w-px md:h-px md:w-12 bg-white/10 relative overflow-hidden">
      {active && (
        <motion.div 
          className="absolute inset-0 bg-brand-primary"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  </div>
);

export default function App() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      {/* Header section */}
      <header className="px-6 py-8 md:px-12 md:py-12 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-brand-primary/10 rounded-lg">
                <Cloud className="text-brand-primary w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-primary font-bold">Client: Data Engineering Project</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-none">
              Cloud-Native <span className="text-brand-primary">ETL</span> Platform
            </h1>
            <p className="text-slate-400 max-w-xl text-lg">
              Architecting scalable, hybrid data processing on AWS with Medallion architecture and automated orchestration.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-end">
              <span className="text-xs uppercase font-mono text-white/40 mb-1">Infrastructure Status</span>
              <div className="flex items-center gap-4 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-500">Live</span>
                </div>
                <div className="h-3 w-px bg-white/10" />
                <div className="text-xs font-mono text-slate-300">Region: us-east-1</div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:px-12">
        {/* Core Architecture Flow */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-12">
            <Activity className="text-brand-secondary w-5 h-5" />
            <h2 className="text-xl font-semibold text-white uppercase tracking-wider font-mono">System Orchestration Flow</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group cursor-pointer w-full md:w-64`}
                  onClick={() => setActiveStage(stage.id === activeStage ? null : stage.id)}
                >
                  <div className={`
                    p-6 rounded-2xl border transition-all duration-300
                    ${activeStage === stage.id 
                      ? `bg-white/10 border-white/20 ring-1 ring-white/10` 
                      : 'bg-white/5 border-white/5 hover:border-white/20'}
                  `}>
                    <div className={`${stage.color} mb-4 p-3 bg-current/10 rounded-xl inline-block`}>
                      {stage.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      {stage.name}
                      < ChevronRight className={`w-4 h-4 transition-transform ${activeStage === stage.id ? 'rotate-90' : ''}`} />
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 h-10 line-clamp-2">
                      {stage.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <div className="h-1 rounded-full bg-white/10 flex-1 overflow-hidden">
                        <motion.div 
                          className={`h-full ${stage.color.replace('text', 'bg')}`}
                          initial={{ width: 0 }}
                          animate={{ width: isLoaded ? '100%' : 0 }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Details interaction */}
                  <AnimatePresence>
                    {activeStage === stage.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 bg-white/5 rounded-xl border border-white/10 p-4"
                      >
                        <h4 className="text-xs uppercase font-mono text-white/40 mb-3 flex items-center gap-2">
                          <Info className="w-3 h-3" /> Core Components
                        </h4>
                        <ul className="space-y-2">
                          {stage.details.map((detail, dIndex) => (
                            <li key={dIndex} className="text-sm text-slate-300 flex items-center gap-2">
                              <div className={`w-1 h-1 rounded-full ${stage.color.replace('text', 'bg')}`} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                {index < stages.length - 1 && <Connector active={true} />}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Medallion Architecture Deep Dive */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6 text-brand-accent">
              <Layers className="w-6 h-6" />
              <span className="font-mono text-sm uppercase font-bold tracking-widest">Medallion Strategy</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              A Scalable S3 Ingestion <br />
              <span className="text-brand-accent">Medallion Layer</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We implemented a 3-tier medallion architecture to ensure data quality and lineage. 
              Starting from raw ingestion, data matures through validation and transformation 
              layers before reaching the gold zone for business observability.
            </p>

            <div className="space-y-6">
              {[
                { title: 'Bronze: Raw Landing', desc: 'Immutable storage of raw source data exactly as received.', icon: <Database /> },
                { title: 'Silver: Cleansed & Integrated', desc: 'Enforced schemas, validated records, and joined datasets.', icon: <Workflow /> },
                { title: 'Gold: Analytics Ready', desc: 'Aggregated datasets optimized for self-service BI and ML.', icon: <Zap /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1 p-2 h-max rounded-lg bg-white/5 border border-white/10 group-hover:bg-brand-accent/20 group-hover:border-brand-accent/30 transition-colors">
                    {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5 text-brand-accent' })}
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Viz Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0b1120] rounded-3xl border border-white/5 p-8 lg:p-12 relative overflow-hidden h-[500px] flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
            
            {/* Visual Medallion Stack */}
            <div className="relative z-10 w-full flex flex-col items-center gap-4">
              {['Gold', 'Silver', 'Bronze'].map((level, i) => (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className={`
                    w-full max-w-xs h-24 rounded-2xl border-2 flex items-center justify-center relative
                    ${level === 'Gold' ? 'border-brand-accent bg-brand-accent/10' : 
                      level === 'Silver' ? 'border-brand-secondary bg-brand-secondary/10 opacity-80' : 
                      'border-brand-primary bg-brand-primary/10 opacity-60'}
                  `}
                >
                  <span className="font-mono font-bold text-xl uppercase tracking-widest">{level}</span>
                  
                  {/* Floating particles for animated flow */}
                  {level !== 'Gold' && (
                    <motion.div 
                      className="absolute -top-12 flex flex-col items-center gap-1"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="w-1 h-8 bg-gradient-to-t from-white/20 to-transparent rounded-full" />
                      <div className="w-2 h-2 rounded-full bg-white/40 blur-[1px]" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Side Labels */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-32">
              <div className="flex items-center gap-2 group cursor-help">
                <div className="w-4 h-px bg-white/20 group-hover:w-8 transition-all" />
                <span className="text-[10px] uppercase font-mono text-white/40 italic">Aggregated</span>
              </div>
              <div className="flex items-center gap-2 group cursor-help">
                <div className="w-4 h-px bg-white/20 group-hover:w-8 transition-all" />
                <span className="text-[10px] uppercase font-mono text-white/40 italic">Transformed</span>
              </div>
              <div className="flex items-center gap-2 group cursor-help">
                <div className="w-4 h-px bg-white/20 group-hover:w-8 transition-all" />
                <span className="text-[10px] uppercase font-mono text-white/40 italic">Raw Source</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Technical Stack Grid */}
        <section className="mt-32">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Hybrid Compute Ecosystem</h2>
            <p className="text-slate-400 max-w-2xl">
              Leveraging both serverless and provisioned compute clusters to balance cost-efficiency with extreme processing power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6 text-brand-primary" />}
              title="Identity & Security"
              desc="IAM roles with least-privilege access, S3 bucket policies, and VPC endpoints for secure data isolation."
            />
            <FeatureCard 
              icon={<Workflow className="w-6 h-6 text-brand-secondary" />}
              title="Step Functions"
              desc="Orchestrated ETL jobs with custom error logic, managing both EMR lifecycle and Glue job states."
            />
            <FeatureCard 
              icon={<Server className="w-6 h-6 text-brand-accent" />}
              title="EMR Auto-scaling"
              desc="Dynamic EMR cluster provisioning based on workload complexity, utilizing Spot instances for cost optimization."
            />
          </div>
        </section>
      </main>

      <footer className="mt-32 py-12 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Cloud className="text-brand-primary w-6 h-6" />
            <span className="font-bold text-white text-xl tracking-tight">ETL Architect <span className="text-slate-500 font-normal">v1.0</span></span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs uppercase font-mono text-white/40 hover:text-white transition-colors">Architecture Spec</a>
            <a href="#" className="text-xs uppercase font-mono text-white/40 hover:text-white transition-colors">AWS Documentation</a>
            <a href="#" className="text-xs uppercase font-mono text-white/40 hover:text-white transition-colors">Security Audit</a>
          </div>
          <p className="text-xs font-mono text-white/20">© 2026 Cloud-Native Data Engineering. Built for Hybrid Scale.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        {title}
        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
