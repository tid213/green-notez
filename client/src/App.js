import React from 'react';
import './App.css';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import { Routes, Route } from 'react-router-dom';
import { AccordionButton } from 'react-bootstrap';

function App() {
  return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={Home()}/>
          <Route exact path='/login' element={LogIn()}/>
          <Route exact path='/signup' element={SignUp()}/>
          <Route exact path='/about' element={About()}/>
          <Route exact path='/forgotpassword' element={ForgotPassword()}/>
          <Route exact path='/dashboard' element={Dashboard()}/>
          <Route exact path='logout' />
        </Routes>
      </div>
  );
}

export default App;
