import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BuyerMarketplace from './pages/BuyerMarketplace';
import FarmerDashboard from './pages/FarmerDashboard';
import Checkout from './pages/Checkout';
import AdminInsights from './pages/AdminInsights';
import Login from './pages/Login';
import Register from './pages/Register';
import Community from './pages/Community';
import Services from './pages/Services';
import Events from './pages/Events';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<BuyerMarketplace />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/insights" element={<AdminInsights />} />
          <Route path="/community" element={<Community />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
