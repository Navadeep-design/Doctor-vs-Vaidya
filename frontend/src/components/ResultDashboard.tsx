import { useState } from 'react';
import { AnalysisResult } from '../services/api';
import MedicineCard from './MedicineCard';
import ClinicalContextCard from './ClinicalContextCard';
import AyurvedaCard from './AyurvedaCard';
import SourceCard from './SourceCard';
import { AlertTriangle, FileText, Activity, HeartPulse, ShieldAlert, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ResultDashboardProps {
  result: AnalysisResult;
  fileName: string;
  isDemo?: boolean;
}

export default function ResultDashboard({ result, fileName, isDemo }: ResultDashboardProps) {
  const [showExtractedText, setShowExtractedText] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {isDemo && (
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-amber-600 mr-3" />
            <h3 className="text-amber-800 font-bold text-lg">FICTIONAL DEMO DATA — FOR PRESENTATION PURPOSES ONLY</h3>
          </div>
          <p className="text-amber-700 mt-1 ml-9">This is not real patient data. It is a predefined example to demonstrate the platform's capabilities.</p>
        </div>
      )}

      {result.urgent_attention && (
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 shadow-sm">
          <div className="flex items-start">
            <ShieldAlert className="h-8 w-8 text-red-600 mr-4 shrink-0 mt-1" />
            <div>
              <h3 className="text-red-800 font-bold text-xl">Urgent Medical Attention Advised</h3>
              <p className="text-red-700 mt-2">The AI identified potentially urgent flags in this document. Please consult a healthcare professional immediately.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-teal-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Document Summary</h3>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">File Name</span>
              <span className="font-medium text-gray-900 truncate max-w-[200px]">{fileName}</span>
            </li>
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Document Type</span>
              <span className="font-medium text-gray-900 capitalize">{result.document_type}</span>
            </li>
            <li className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500">Readability</span>
              <span className="font-medium text-gray-900 capitalize">{result.document_readability}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Medicines Found</span>
              <span className="font-bold text-teal-600">{result.medicines.length}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-6 w-6 text-teal-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Diagnosis Visibility</h3>
          </div>
          <div className={`p-4 rounded-lg border ${result.diagnosis_explicitly_visible.toLowerCase().includes('no') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            <p className="font-medium">{result.diagnosis_explicitly_visible}</p>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            * This platform does not generate new diagnoses. It only reports what is explicitly written on the prescription document.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <button 
          onClick={() => setShowExtractedText(!showExtractedText)}
          className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-bold text-gray-900">Raw Extracted Text</h3>
          </div>
          {showExtractedText ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </button>
        {showExtractedText && (
          <div className="p-6 border-t border-gray-200">
            <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap font-mono">
              {result.extracted_text || 'No text could be extracted.'}
            </pre>
          </div>
        )}
      </div>

      {result.medicines.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
              <span className="text-teal-700 font-bold">1</span>
            </div>
            Identified Medicines
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {result.medicines.map((med, idx) => (
              <MedicineCard key={idx} medicine={med} />
            ))}
          </div>
        </section>
      )}

      {result.possible_clinical_context.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
              <span className="text-amber-700 font-bold">2</span>
            </div>
            Possible Clinical Context
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {result.possible_clinical_context.map((ctx, idx) => (
              <ClinicalContextCard key={idx} context={ctx} />
            ))}
          </div>
        </section>
      )}

      {result.ayurveda_context.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-700 font-bold">3</span>
            </div>
            Modern Medicine × Ayurveda Integration
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {result.ayurveda_context.map((ctx, idx) => (
              <AyurvedaCard key={idx} ayurveda={ctx} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.safety_information.length > 0 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <HeartPulse className="h-5 w-5 text-red-500 mr-2" /> Safety Information
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {result.safety_information.map((info, idx) => (
                <li key={idx}>{info}</li>
              ))}
            </ul>
          </div>
        )}

        {result.uncertainties.length > 0 && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" /> Analysis Uncertainties
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {result.uncertainties.map((unc, idx) => (
                <li key={idx}>{unc}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {result.sources.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Knowledge Sources</h3>
          <div className="flex flex-wrap gap-2">
            {result.sources.map((source, idx) => (
              <SourceCard key={idx} source={source} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
