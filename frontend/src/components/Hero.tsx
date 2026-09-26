import { Link } from 'react-router-dom';
import { FileText, Cpu, Pill, BookOpen, Leaf, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const steps = [
    { icon: FileText, text: 'Prescription Image' },
    { icon: Cpu, text: 'AI Analysis' },
    { icon: Pill, text: 'Medicines Identified' },
    { icon: BookOpen, text: 'Medical Explanation' },
    { icon: Leaf, text: 'Ayurveda Context' },
    { icon: ShieldCheck, text: 'Evidence & Safety' },
  ];

  return (
    <div className="bg-gray-950 text-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-8 animate-fadeIn">
          <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-semibold text-teal-400 bg-teal-950/50 border border-teal-900/50">
            AI-Powered Educational Platform
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Understand Medicines.<br/>
            <span className="text-teal-500">Connect Medical Knowledge.</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl">
            An AI-powered educational platform that helps students and users understand prescriptions, medicines, medical terminology, and related Ayurvedic concepts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/analyzer" className="bg-teal-600 hover:bg-teal-700 text-white text-center rounded-lg px-8 py-4 font-medium transition-colors shadow-lg shadow-teal-900/20">
              Analyze a Prescription
            </Link>
            <Link to="/medicines" className="border-2 border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-center rounded-lg px-8 py-4 font-medium transition-colors">
              Explore Medical Knowledge
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500 pt-6 border-t border-gray-900">
            <span className="flex items-center"><strong className="text-gray-300 mr-2">20+</strong> Medicines</span>
            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
            <span className="flex items-center"><strong className="text-gray-300 mr-2">15+</strong> Ayurveda Concepts</span>
            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
            <span>Real AI Analysis</span>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-full max-w-md bg-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="absolute left-12 top-12 bottom-12 w-0.5 bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent"></div>
            
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center relative z-10 animate-fadeIn" style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}>
                  <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mr-6 shrink-0 shadow-lg group-hover:border-teal-500 transition-colors">
                    <step.icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 flex-1 text-gray-300 font-medium">
                    {step.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
