import { useState, useEffect } from 'react';
import { getMedicines, Medicine } from '../services/api';
import { Search, Filter, Loader2, Pill, Info } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';

export default function Medicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  useEffect(() => {
    async function load() {
      try {
        const data = await getMedicines();
        setMedicines(data);
      } catch (e: any) {
        setError('Failed to load medicines. The backend service might be offline.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const classes = ['All', ...Array.from(new Set(medicines.map(m => m.drug_class)))];

  const filtered = medicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.generic_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || m.drug_class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Disclaimer />
      
      <div className="bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Medicine Explorer</h1>
          <p className="text-gray-400 max-w-2xl mb-8">
            Browse our educational database of common medicines, their uses, and mechanisms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input 
                type="text"
                placeholder="Search by brand or generic name..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full sm:w-64">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <select 
                className="w-full pl-10 pr-8 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white appearance-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-teal-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-center">
            <Info className="h-6 w-6 mr-3" />
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(med => (
              <div key={med.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">{med.name}</h3>
                <p className="text-sm text-gray-500 italic mb-3">{med.generic_name}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 mb-4">
                  <Pill className="w-3 h-3 mr-1" />
                  {med.drug_class}
                </span>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{med.description}</p>
                <div className="pt-4 border-t border-gray-50">
                  <button className="text-teal-600 font-medium text-sm hover:text-teal-700 w-full text-center">
                    View Details
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No medicines found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
