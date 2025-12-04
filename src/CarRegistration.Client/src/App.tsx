import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CarList from './components/CarList';
import LiveRegistration from './components/LiveRegistration';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        {/* Navigation Bar */}
        <nav className="bg-slate-800 text-white p-4 shadow-md">
          <div className="container mx-auto px-4 flex gap-6 items-center">
            <span className="font-bold text-xl tracking-tight">🚗 RegoCheck</span>
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-300 transition">Inventory</Link>
              <Link to="/registration" className="hover:text-blue-300 transition">Live Registration</Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/registration" element={<div className="text-center p-10"><LiveRegistration /></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;