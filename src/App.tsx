import React from 'react';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";

// Pages
import Home from "./Pages/Home"
import SantralBig from './Pages/SantralBig';

// Components
import Logo from './Components/logo';
import HighNav from './Components/high-nav';

function App() {
  return (
    <div className='bg-slate-100 min-w-screen min-h-screen pt-[14vh]'>
    <nav className='bg-slate-50 w-screen h-[14vh] drop-shadow-xl py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-50'>
      <Link to="/"><Logo style='h-[10vh] w-auto'></Logo> </Link>
      <HighNav></HighNav>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:name" element={<SantralBig />} />
    </Routes>
    </div>
  );
}

export default App;
