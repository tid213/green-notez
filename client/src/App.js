import React from 'react';
import './App.css';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={Home()}/>
          <Route path='/login' element={LogIn()}/>
        </Routes>
      </div>
  );
}

export default App;
