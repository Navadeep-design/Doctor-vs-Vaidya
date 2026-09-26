import { ClinicalContext } from '../services/api';
import { Lightbulb, Info } from 'lucide-react';

interface ClinicalContextCardProps {
  context: ClinicalContext;
}

export default function ClinicalContextCard({ context }: ClinicalContextCardProps) {
  const confidenceColors = {
    high: 'bg-green-100 text-green-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center text-amber-600">
            <Lightbulb className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-bold">Clinical Context Hypothesis</h3>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium uppercase ${confidenceColors[context.confidence]}`}>
            {context.confidence} Confidence
          </span>
        </div>
        
        <p className="text-gray-900 text-lg mb-4">{context.context}</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Reasoning Basis:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            {context.reasoning_basis.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-start text-xs text-amber-700 bg-amber-50 p-3 rounded-md">
          <Info className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
          <p>This is not a diagnosis. The prescription alone does not establish a diagnosis. This hypothesis is generated solely based on common uses for the identified medicines for educational context.</p>
        </div>
      </div>
    </div>
  );
}
