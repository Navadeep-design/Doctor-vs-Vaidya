import Disclaimer from '../components/Disclaimer';

export default function Team() {
  const teamMembers = [
    { name: 'S. Rajdeep Singh', role: 'Back-End Dev', initials: 'SR', color: 'from-blue-400 to-blue-600' },
    { name: 'N. Sujith', role: 'Back-End Dev', initials: 'NS', color: 'from-indigo-400 to-indigo-600' },
    { name: 'N. Navadeep', role: 'Front-End Dev', initials: 'NN', color: 'from-teal-400 to-teal-600' },
    { name: 'B. Vijaya Raju', role: 'Front-End Dev', initials: 'BV', color: 'from-emerald-400 to-emerald-600' },
    { name: 'V. Shashikiran', role: 'Documentation & Presentation', initials: 'VS', color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Disclaimer />
      
      <div className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are a student development team exploring how artificial intelligence can make complex medical information easier to understand and contextualize.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-6 border-4 border-white ring-2 ring-gray-100`}>
                {member.initials}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                {member.role}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-teal-900 text-white p-8 rounded-2xl text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-teal-300">Academic Project Context</h2>
          <p className="text-teal-50">
            This project was developed collaboratively to explore the intersection of modern web development, multimodal AI, and health informatics. Each team member contributed to designing a safe, educational, and intuitive platform.
          </p>
        </div>
      </div>
    </div>
  );
}
