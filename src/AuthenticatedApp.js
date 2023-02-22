import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import GrowManager from './pages/GrowManager';

function AuthenticatedApp({session}){

    return(
    <div className="App">
      <Routes>
        <Route exact path='/dashboard' element={Dashboard({session})} />
        <Route exact path='/profile' element={Profile({session})} />
        <Route exact path='/manager' element={GrowManager({session})} />
        <Route path='*' element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
    )
}

export default AuthenticatedApp;