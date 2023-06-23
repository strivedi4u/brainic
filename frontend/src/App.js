import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Help from './pages/Help';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const App = () => {
  return (
    <><Navbar />
      <BrowserRouter>
        <Routes >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/help" element={<Help />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
