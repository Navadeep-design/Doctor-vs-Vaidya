import Disclaimer from '../components/Disclaimer';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <Disclaimer />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Why We Built Doctors × Vaidyas Services</h1>
        
        <div className="prose prose-teal prose-lg max-w-none text-gray-700">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Project Motivation</h2>
            <p>
              Navigating medical information is a daunting task for students and ordinary citizens alike. 
              Prescriptions are notoriously difficult to read, and understanding the pharmacological logic behind them 
              requires advanced medical knowledge. Furthermore, our healthcare landscape encompasses multiple distinct 
              systems of knowledge—most notably modern allopathic medicine and traditional systems like Ayurveda.
            </p>
            <p>
              We built this platform to bridge these gaps using modern artificial intelligence, creating an educational 
              tool that makes complex medical information accessible while respecting the boundaries between different 
              medical traditions.
            </p>
          </section>

          <section className="mb-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Academic Project Overview</h2>
            <ul className="space-y-3 font-medium">
              <li className="flex"><span className="text-gray-500 w-48 shrink-0">PROJECT:</span> <span>Doctors × Vaidyas Services</span></li>
              <li className="flex"><span className="text-gray-500 w-48 shrink-0">DOMAIN:</span> <span>Healthcare Technology + AI + Educational Medical Information</span></li>
              <li className="flex"><span className="text-gray-500 w-48 shrink-0">KEY TECHNOLOGIES:</span> <span>React, FastAPI, Google Gemini API, SQLite/JSON, Firebase Auth</span></li>
              <li className="flex"><span className="text-gray-500 w-48 shrink-0">CORE INNOVATION:</span> <span>Multimodal AI-assisted prescription understanding with Ayurveda context</span></li>
              <li className="flex text-amber-700"><span className="text-amber-600/70 w-48 shrink-0">LIMITATION:</span> <span>Educational only, no diagnosis, no treatment decisions</span></li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Educational Purpose</h2>
            <p>
              This tool is designed primarily for students of medicine, pharmacy, and related health sciences, as well as 
              curious individuals who want to learn more about pharmacology. It provides a structured way to break down 
              clinical documents and study the identified medicines in depth.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Modern Medicine + Ayurveda Context</h2>
            <p>
              A unique feature of this project is its comparative approach. When the AI identifies modern medicines and 
              generates a possible clinical context (e.g., treating fever), the system queries an internal educational 
              database to present related traditional Ayurvedic concepts (e.g., Jwara). 
            </p>
            <p>
              This is not to suggest that treatments are interchangeable, but rather to foster cross-disciplinary 
              understanding and acknowledge the rich heritage of traditional medical knowledge systems.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">AI Innovation</h2>
            <p>
              We leverage Google's Gemini multimodal AI to perform complex Optical Character Recognition (OCR) on messy, 
              unstructured prescription images. The AI doesn't just extract text; it parses the data into structured JSON, 
              identifying the exact medicines, dosages, and implicit clinical context based on general medical knowledge.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
