import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-teal-500" />
              <span className="text-xl font-bold text-white">Doctors × Vaidyas</span>
            </Link>
            <p className="text-sm max-w-sm mb-4">
              Bridging Modern Medicine and Ayurveda Through AI. An educational platform for understanding prescriptions and medical knowledge.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/analyzer" className="hover:text-teal-400 transition-colors">Analyzer</Link></li>
              <li><Link to="/medicines" className="hover:text-teal-400 transition-colors">Medicines</Link></li>
              <li><Link to="/ayurveda" className="hover:text-teal-400 transition-colors">Ayurveda</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Project</Link></li>
              <li><Link to="/team" className="hover:text-teal-400 transition-colors">Team</Link></li>
              <li><Link to="/how-it-works" className="hover:text-teal-400 transition-colors">How It Works</Link></li>
              <li><Link to="#" className="hover:text-teal-400 transition-colors">Privacy & Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="mb-4 md:mb-0">
            &copy; 2026 Doctors × Vaidyas Services. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <span className="text-amber-500 border border-amber-900 bg-amber-950/30 px-2 py-1 rounded">Educational Use Only</span>
            <span className="px-2 py-1">Built with Google Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
