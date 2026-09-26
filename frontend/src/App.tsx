import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Medicines from './pages/Medicines';
import AyurvedaPage from './pages/AyurvedaPage';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Team from './pages/Team';
import Login from './pages/Login';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/ayurveda" element={<AyurvedaPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
