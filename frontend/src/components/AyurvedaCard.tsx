import { AyurvedaContext } from '../services/api';
import { Leaf, ArrowRight, Book, AlertTriangle } from 'lucide-react';

interface AyurvedaCardProps {
  ayurveda: AyurvedaContext;
}

export default function AyurvedaCard({ ayurveda }: AyurvedaCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg font-medium border border-blue-100">
              {ayurveda.modern_concept}
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <div className="bg-green-50 text-green-800 px-3 py-2 rounded-lg font-bold border border-green-200 flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              {ayurveda.ayurveda_concept}
            </div>
          </div>
          
          <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium inline-block w-max">
            {ayurveda.relationship}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
              <Book className="h-4 w-4 mr-2" /> Traditional Description
            </h4>
            <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100 h-full relative">
              <div className="absolute top-2 left-2 text-4xl text-amber-200 font-serif leading-none opacity-50">"</div>
              <p className="text-gray-800 relative z-10 italic pl-4">
                {ayurveda.traditional_description}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Modern Evidence Status</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                {ayurveda.modern_evidence_status}
              </p>
            </div>
            
            {ayurveda.safety_note && (
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 shrink-0" />
                <p className="text-sm text-amber-800">{ayurveda.safety_note}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-center text-gray-500">
          Traditional knowledge and modern clinical evidence are distinct knowledge systems. Consult appropriately qualified practitioners in each respective field.
        </div>
      </div>
    </div>
  );
}
