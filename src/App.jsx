import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/navbar" element={<NavBar />} />
        {/* Route for 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router> 
  );
}

export default App;