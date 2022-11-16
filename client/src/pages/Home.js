import React, { useEffect } from 'react';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
    return (
    <div>
      <NavBar />
      <div className='pageStyle'>
      <h1>Project Home</h1>
      <button variant="raised" onClick={() => navigate('/login')}>
            Login
            </button>
      <button variant="raised" onClick={() => navigate('/signup')}>
            Sign Up
      </button>
      </div>
    </div>
    );
}
export default Home;