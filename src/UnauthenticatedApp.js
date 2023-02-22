import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword' ;


function UnauthenticatedApp() {

    return(
    <div className="App">
      <Routes>
        <Route exact path='/' element={Home()} />
        <Route exact path='/signup' element={SignUp()} />
        <Route exact path='/signin' element={SignIn()} />
        <Route exact path='/about' element={About()} />
        <Route exact path='/forgotpassword' element={ForgotPassword()} />
        <Route exact path='/resetpassword' element={ResetPassword()} />
      </Routes>
    </div>
    );
}

export default UnauthenticatedApp;