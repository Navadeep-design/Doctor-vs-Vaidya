import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Disclaimer from '../components/Disclaimer';
import UploadBox from '../components/UploadBox';
import { ArrowRight, Search, FileText, BrainCircuit, Leaf, GraduationCap, Shield } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: FileText, title: 'Prescription Extraction', desc: 'State-of-the-art OCR extracts messy handwriting and complex medical formatting.' },
    { icon: Search, title: 'Medicine Identification', desc: 'Identifies brand names, generics, and maps them to standard drug classes.' },
    { icon: BrainCircuit, title: 'AI Explanations', desc: 'Breaks down complex medical jargon into easy-to-understand concepts at multiple levels.' },
    { icon: Leaf, title: 'Ayurveda Integration', desc: 'Maps modern medical concepts to traditional Ayurvedic principles when applicable.' },
    { icon: GraduationCap, title: 'Student Mode', desc: 'Specialized deep-dive information for medical and pharmacy students.' },
    { icon: Shield, title: 'Safety First', desc: 'Highlights major side effects and safety considerations for educational awareness.' },
    { icon: Activity, title: 'Contextual Hypothesis', desc: 'Generates potential clinical contexts based on the combination of medicines.' },
  ];

  const team = [
    { initials: 'SR', name: 'S. Rajdeep Singh', role: 'Back-End Dev', color: 'from-blue-400 to-blue-600' },
    { initials: 'NS', name: 'N. Sujith', role: 'Back-End Dev', color: 'from-indigo-400 to-indigo-600' },
    { initials: 'NN', name: 'N. Navadeep', role: 'Front-End Dev', color: 'from-teal-400 to-teal-600' },
    { initials: 'BV', name: 'B. Vijaya Raju', role: 'Front-End Dev', color: 'from-emerald-400 to-emerald-600' },
    { initials: 'VS', name: 'V. Shashikiran', role: 'Documentation', color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <div className="bg-white">
      <Hero />
      <Disclaimer />
      
      {/* Problem Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Medical Information Gap</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Medical prescriptions are often difficult to read and filled with complex terminology. Students learning about medicine and ordinary users trying to understand their health information face a steep learning curve. Furthermore, traditional systems like Ayurveda are often siloed away from modern medical understanding.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <p className="text-xl text-gray-500">Bridging the gap with Artificial Intelligence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Digitize</h3>
              <p className="text-gray-600">Transform unreadable prescriptions into structured digital text.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BrainCircuit className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Understand</h3>
              <p className="text-gray-600">Get AI-generated explanations of what each medicine does and why.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Connect</h3>
              <p className="text-gray-600">See how modern treatments map to classical Ayurvedic concepts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analyzer Preview */}
      <section className="py-20 bg-teal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Try the AI Analyzer</h2>
              <p className="text-teal-100 mb-8 text-lg">
                Upload a prescription image and watch our AI extract the medicines, explain their uses, and provide the traditional Ayurvedic context.
              </p>
              <Link to="/analyzer" className="inline-flex items-center px-6 py-3 bg-white text-teal-900 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                Go to Analyzer <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="w-full lg:w-1/2 bg-white rounded-2xl p-2 shadow-2xl">
              <div className="bg-gray-50 rounded-xl p-8 pointer-events-none">
                <UploadBox onFileSelect={() => {}} onClear={() => {}} selectedFile={null} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ayurveda Teaser */}
      <section className="py-20 bg-green-50 border-y border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="h-12 w-12 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Modern Medicine × Ayurveda</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Our platform uniquely cross-references identified modern medicines and clinical contexts with traditional Ayurvedic concepts (like Jwara, Prameha) to provide a holistic educational view.
          </p>
          <Link to="/ayurveda" className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-700 font-bold rounded-lg hover:bg-green-600 hover:text-white transition-colors">
            Explore Ayurveda Dictionary
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Platform Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <feature.icon className="h-10 w-10 text-teal-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">System Architecture</h2>
            <p className="text-gray-400">Powered by modern web technologies and Google Gemini AI</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center w-full md:w-1/3">
              <div className="text-teal-400 font-bold mb-2">Frontend</div>
              <div className="text-gray-300 text-sm">React + Vite + Tailwind</div>
            </div>
            <ArrowRight className="hidden md:block h-8 w-8 text-gray-600" />
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center w-full md:w-1/3">
              <div className="text-blue-400 font-bold mb-2">Backend API</div>
              <div className="text-gray-300 text-sm">FastAPI + Python</div>
            </div>
            <ArrowRight className="hidden md:block h-8 w-8 text-gray-600" />
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center w-full md:w-1/3 border-t-4 border-t-amber-500">
              <div className="text-amber-400 font-bold mb-2">AI Engine</div>
              <div className="text-gray-300 text-sm">Google Gemini Multimodal API</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet the Development Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4`}>
                  {member.initials}
                </div>
                <h4 className="font-bold text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/team" className="text-teal-600 font-medium hover:text-teal-700">
              Read more about the team &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to explore medical knowledge?</h2>
        <Link to="/analyzer" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg rounded-lg px-8 py-4 transition-colors">
          Try the AI Prescription Analyzer
        </Link>
      </section>
    </div>
  );
}

// Ensure Activity is imported if used (added here to fix potential missing import above)
import { Activity } from 'lucide-react';
