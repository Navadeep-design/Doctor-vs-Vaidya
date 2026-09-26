import { useState } from 'react';
import { MedicineResult } from '../services/api';
import { Pill, AlertTriangle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { getExplanation } from '../services/api';

interface MedicineCardProps {
  medicine: MedicineResult;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExp, setLoadingExp] = useState(false);

  const confidenceColors = {
    high: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-red-100 text-red-800 border-red-200'
  };

  const handleExplain = async (level: string) => {
    setLoadingExp(true);
    setExplanation(null);
    try {
      const exp = await getExplanation(medicine.medicine_name, level);
      setExplanation(exp);
    } catch (e) {
      setExplanation("Failed to load explanation. Please try again.");
    } finally {
      setLoadingExp(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border-l-4 border-l-teal-500 border border-y-gray-100 border-r-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{medicine.medicine_name}</h3>
            <p className="text-sm text-gray-500 italic">{medicine.generic_name}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full border font-medium uppercase ${confidenceColors[medicine.confidence]}`}>
            {medicine.confidence} Match
          </span>
        </div>

        <div className="mt-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Pill className="w-3 h-3 mr-1" />
            {medicine.drug_class}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div>
            <span className="text-gray-500 block text-xs uppercase tracking-wider">Strength</span>
            <span className="font-medium text-gray-900">{medicine.strength || 'Not specified'}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs uppercase tracking-wider">Dosage</span>
            <span className="font-medium text-gray-900">{medicine.dosage_instruction_visible || 'Not specified'}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs uppercase tracking-wider">Frequency</span>
            <span className="font-medium text-gray-900">{medicine.frequency_visible || 'Not specified'}</span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs uppercase tracking-wider">Duration</span>
            <span className="font-medium text-gray-900">{medicine.duration_visible || 'Not specified'}</span>
          </div>
        </div>

        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 w-full justify-center py-2 border-t border-gray-100"
        >
          {expanded ? (
            <><ChevronUp className="w-4 h-4 mr-1" /> Hide Details</>
          ) : (
            <><ChevronDown className="w-4 h-4 mr-1" /> View Medical Details</>
          )}
        </button>

        {expanded && (
          <div className="mt-4 space-y-4 text-sm border-t border-gray-100 pt-4 animate-fadeIn">
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Common Medical Uses</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {medicine.common_medical_uses.map((use, i) => <li key={i}>{use}</li>)}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-1">General Mechanism</h4>
              <p className="text-gray-700">{medicine.general_mechanism}</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">Common Side Effects</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {medicine.common_side_effects.map((effect, i) => <li key={i}>{effect}</li>)}
              </ul>
            </div>

            {medicine.major_safety_considerations.length > 0 && (
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-900 mb-1 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" /> Safety Considerations
                </h4>
                <ul className="list-disc pl-5 text-amber-800 space-y-1">
                  {medicine.major_safety_considerations.map((safety, i) => <li key={i}>{safety}</li>)}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-bold text-gray-900 mb-3">Ask AI for Explanation</h4>
              <div className="flex space-x-2">
                <button onClick={() => handleExplain('beginner')} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-teal-50 hover:text-teal-700 rounded transition-colors font-medium">Beginner</button>
                <button onClick={() => handleExplain('standard')} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-teal-50 hover:text-teal-700 rounded transition-colors font-medium">Standard</button>
                <button onClick={() => handleExplain('detailed')} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-teal-50 hover:text-teal-700 rounded transition-colors font-medium">Detailed</button>
              </div>
              
              {loadingExp && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg flex justify-center items-center">
                  <Loader2 className="w-5 h-5 text-teal-500 animate-spin mr-2" />
                  <span className="text-gray-500 text-sm">Generating explanation...</span>
                </div>
              )}
              
              {explanation && !loadingExp && (
                <div className="mt-3 p-4 bg-teal-50 border border-teal-100 rounded-lg text-teal-900 text-sm leading-relaxed whitespace-pre-wrap animate-fadeIn">
                  {explanation}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
