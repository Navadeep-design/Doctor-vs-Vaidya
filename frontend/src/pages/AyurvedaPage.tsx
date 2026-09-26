import { useState, useEffect } from 'react';
import { getAyurveda, AyurvedaConcept } from '../services/api';
import { Leaf, Loader2, Book } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';

export default function AyurvedaPage() {
  const [concepts, setConcepts] = useState<AyurvedaConcept[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    async function load() {
      try {
        const data = await getAyurveda();
        setConcepts(data);
      } catch (e: any) {
        setError('Failed to load Ayurveda concepts. Backend might be offline.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ['All', 'Classical Concepts', 'Prameha', 'Herbs', 'Traditional Formulations', 'Ahara', 'Vihara'];

  const filtered = activeTab === 'All' ? concepts : concepts.filter(c => c.category === activeTab);

  return (
    <div className="bg-amber-50/30 min-h-screen pb-20">
      <Disclaimer />
      
      <div className="bg-emerald-900 text-white py-16 text-center border-b border-emerald-800">
        <Leaf className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 font-serif">Ayurveda Knowledge Base</h1>
        <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
          Explore classical Ayurvedic concepts and how they relate to modern medical terminology.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar space-x-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === cat 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-6 rounded-xl text-center max-w-2xl mx-auto">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map(concept => (
              <div key={concept.id} className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 font-serif">{concept.concept_name}</h3>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                      {concept.category}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 inline-block text-sm">
                    Related Modern Concept: <strong className="text-gray-900">{concept.modern_related_concept}</strong>
                  </div>
                  
                  <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100 relative mb-4">
                    <Book className="absolute top-4 right-4 h-5 w-5 text-amber-200" />
                    <p className="text-gray-800 text-sm italic pr-8">{concept.traditional_description}</p>
                  </div>
                </div>
                
                <div className="bg-emerald-50 px-6 py-4 border-t border-emerald-100">
                  <button className="text-emerald-700 font-bold hover:text-emerald-800 w-full text-center">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No concepts found in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
