import { useState } from 'react';
import UploadBox from '../components/UploadBox';
import ProcessingState from '../components/ProcessingState';
import ResultDashboard from '../components/ResultDashboard';
import Disclaimer from '../components/Disclaimer';
import { analyzePrescription, AnalysisResult } from '../services/api';
import { AlertCircle } from 'lucide-react';

type State = 'idle' | 'uploading' | 'processing' | 'success' | 'demo' | 'error';

export default function Analyzer() {
  const [state, setState] = useState<State>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [steps, setSteps] = useState([
    { label: 'Uploading secure document', status: 'pending' as const },
    { label: 'Running multimodal OCR extraction', status: 'pending' as const },
    { label: 'Identifying medicines and context', status: 'pending' as const },
    { label: 'Fetching Ayurveda integration data', status: 'pending' as const },
  ]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setState('idle');
    setResult(null);
    setErrorMsg('');
  };

  const handleClear = () => {
    setFile(null);
    setState('idle');
    setResult(null);
    setErrorMsg('');
  };

  const startAnalysis = async () => {
    if (!file) return;
    
    setState('processing');
    setSteps([
      { label: 'Uploading secure document', status: 'done' },
      { label: 'Running multimodal OCR extraction', status: 'active' },
      { label: 'Identifying medicines and context', status: 'pending' },
      { label: 'Fetching Ayurveda integration data', status: 'pending' },
    ]);

    try {
      // Simulate step progression for UX
      setTimeout(() => {
        setSteps(s => [s[0], s[1], { ...s[2], status: 'active' }, s[3]]);
      }, 2000);
      
      const analysisData = await analyzePrescription(file);
      
      setSteps(s => s.map(step => ({ ...step, status: 'done' })));
      setResult(analysisData);
      setState('success');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.detail || err.message || 'An error occurred during analysis.');
      setState('error');
    }
  };

  const loadDemoData = () => {
    setState('demo');
    setResult({
      document_type: "prescription",
      document_readability: "readable",
      patient_information_visible: false,
      diagnosis_explicitly_visible: "No diagnosis explicitly visible",
      extracted_text: "[FICTIONAL DEMO] Paracetamol 500mg TDS x 5 days, Cetirizine 10mg OD, ORS sachets",
      medicines: [
        { medicine_name: "Paracetamol", generic_name: "Acetaminophen", drug_class: "Analgesic / Antipyretic", strength: "500mg", dosage_instruction_visible: "TDS (three times daily) x 5 days", frequency_visible: "TDS", duration_visible: "5 days", common_medical_uses: ["Fever reduction", "Pain relief"], general_mechanism: "Inhibits prostaglandin synthesis in CNS...", common_side_effects: ["Generally well tolerated"], major_safety_considerations: ["Do not exceed recommended dose", "Hepatotoxicity risk at high doses"], confidence: "high" },
        { medicine_name: "Cetirizine", generic_name: "Cetirizine Hydrochloride", drug_class: "Second-generation Antihistamine", strength: "10mg", dosage_instruction_visible: "OD (once daily)", frequency_visible: "OD", duration_visible: "Not specified", common_medical_uses: ["Allergic rhinitis", "Urticaria"], general_mechanism: "H1 receptor antagonist", common_side_effects: ["Mild drowsiness"], major_safety_considerations: ["Caution when driving"], confidence: "high" }
      ],
      possible_clinical_context: [{ context: "Fever and/or upper respiratory symptoms management may be part of the clinical context based on the identified medicines.", reasoning_basis: ["Paracetamol is an antipyretic and analgesic", "Cetirizine suggests possible allergic or respiratory symptoms"], confidence: "medium", is_diagnosis: false }],
      ayurveda_context: [{ modern_concept: "Fever (Pyrexia)", ayurveda_concept: "Jwara", relationship: "Partly overlapping concept", traditional_description: "Jwara is described as the king of diseases in Ayurveda, with similar symptomatology including fever, body ache, and fatigue.", modern_evidence_status: "Partly overlapping — different conceptual frameworks", safety_note: "High fever requires modern medical evaluation. Ayurvedic approaches may complement mild fever care under guidance." }],
      safety_information: ["Always follow the instructions of the prescribing healthcare professional.", "Do not stop or change prescribed medicines based on this website."],
      uncertainties: ["Duration for Cetirizine was not specified on the document."],
      urgent_attention: false,
      sources: ["General medical knowledge (educational reference)", "WHO Essential Medicines List"]
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Disclaimer />
      
      <div className="bg-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Prescription Analyzer</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Upload a prescription to extract medicines, understand their uses, and see related Ayurvedic concepts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        
        {(state === 'idle' || state === 'error') && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-fadeIn">
            <UploadBox onFileSelect={handleFileSelect} onClear={handleClear} selectedFile={file} />
            
            {state === 'error' && (
              <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-200 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-800 font-bold">Analysis Failed</h4>
                  <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={startAnalysis}
                disabled={!file}
                className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold transition-all shadow-md ${file ? 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Analyze Prescription
              </button>
              <div className="text-gray-400 text-sm">or</div>
              <button 
                onClick={loadDemoData}
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold border-2 border-amber-400 text-amber-600 hover:bg-amber-50 transition-all"
              >
                Try Demo Data
              </button>
            </div>
          </div>
        )}

        {state === 'processing' && (
          <div className="py-12">
            <ProcessingState steps={steps} />
          </div>
        )}

        {(state === 'success' || state === 'demo') && result && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              <button 
                onClick={() => { setState('idle'); setFile(null); setResult(null); }}
                className="text-teal-600 hover:text-teal-800 font-medium text-sm bg-teal-50 px-4 py-2 rounded-lg"
              >
                Analyze Another Document
              </button>
            </div>
            <ResultDashboard 
              result={result} 
              fileName={file ? file.name : 'demo_prescription.jpg'} 
              isDemo={state === 'demo'} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
