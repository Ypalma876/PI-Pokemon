import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import LP from './components/LandingPg/LandingPg.jsx';
import Home from './components/Home/Home.jsx';
import PokemonCreate from './components/PokemonCreate/PokemonCreate.jsx';
import Detail from './components/Detail/Detail.jsx'


function App() {
  return (
      <div>
        <Routes>
          <Route exact path="/" element={<LP />} />
          <Route path='/home' element = {<Home />} />
          <Route path='/pokemon' element={<PokemonCreate />} />
          <Route path='/home/:id' element={<Detail />} />
        </Routes>
    </div>
  );
}

export default App;
