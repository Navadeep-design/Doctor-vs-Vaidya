import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface Step {
  label: string;
  status: 'pending' | 'active' | 'done';
}

interface ProcessingStateProps {
  steps: Step[];
}

export default function ProcessingState({ steps }: ProcessingStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 max-w-xl mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-900">Analyzing Prescription...</h3>
        <p className="text-gray-500 mt-2 text-sm">Our AI is processing the document and extracting medical information.</p>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div className="h-full bg-teal-500 w-full animate-pulse-slow origin-left" style={{ transform: 'scaleX(0.7)' }}></div>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div className="mr-4 shrink-0">
              {step.status === 'done' && <CheckCircle2 className="h-6 w-6 text-green-500" />}
              {step.status === 'active' && <Loader2 className="h-6 w-6 text-teal-500 animate-spin" />}
              {step.status === 'pending' && <Circle className="h-6 w-6 text-gray-300" />}
            </div>
            <div className={`font-medium ${
              step.status === 'done' ? 'text-gray-900' : 
              step.status === 'active' ? 'text-teal-700' : 'text-gray-400'
            }`}>
              {step.label}
              {step.status === 'active' && <span className="animate-pulse">...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
