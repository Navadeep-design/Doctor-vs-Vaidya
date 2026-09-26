import { UploadCloud, Cpu, Pill, Lightbulb, Leaf } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';

export default function HowItWorks() {
  const steps = [
    {
      icon: UploadCloud,
      title: '1. Upload',
      desc: 'Upload a prescription image or PDF securely.',
      color: 'bg-blue-100 text-blue-600',
      border: 'border-blue-200'
    },
    {
      icon: Cpu,
      title: '2. Extract Text',
      desc: 'AI reads and extracts visible text from the document, including handwriting.',
      color: 'bg-indigo-100 text-indigo-600',
      border: 'border-indigo-200'
    },
    {
      icon: Pill,
      title: '3. Identify Medicines',
      desc: 'Medicines are identified and normalized to their generic names and drug classes.',
      color: 'bg-teal-100 text-teal-600',
      border: 'border-teal-200'
    },
    {
      icon: Lightbulb,
      title: '4. Explain',
      desc: 'Each medicine is explained using general medical knowledge. You can ask for beginner or detailed explanations.',
      color: 'bg-amber-100 text-amber-600',
      border: 'border-amber-200'
    },
    {
      icon: Leaf,
      title: '5. Compare & Learn',
      desc: 'Related Ayurvedic concepts are presented alongside modern medicine for holistic educational context.',
      color: 'bg-green-100 text-green-600',
      border: 'border-green-200'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Disclaimer />
      
      <div className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600">Our pipeline combines cutting-edge AI with structured medical knowledge.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${step.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-teal-400">Technology Stack</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-gray-400">
              <span className="px-3 py-1 border border-gray-700 rounded-full">React 18</span>
              <span className="px-3 py-1 border border-gray-700 rounded-full">TypeScript</span>
              <span className="px-3 py-1 border border-gray-700 rounded-full">Tailwind CSS</span>
              <span className="px-3 py-1 border border-gray-700 rounded-full">FastAPI</span>
              <span className="px-3 py-1 border border-gray-700 rounded-full">Google Gemini Pro</span>
              <span className="px-3 py-1 border border-gray-700 rounded-full">Firebase Auth</span>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-12">
            <h2 className="text-2xl font-bold mb-4 text-amber-500">Privacy & Educational Notice</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              This platform does not store uploaded prescriptions on our servers permanently. They are processed in-memory for AI extraction and immediately discarded. 
              The system operates entirely for educational purposes and does not establish a doctor-patient relationship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
