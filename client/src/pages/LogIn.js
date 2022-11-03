import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function LogIn() {
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9000/login/")
            .then(res => res.text())
            .then(res => setMessage(res));
      });

    return (
      <div>
        <NavBar />
        <h1>{message}</h1>
        <button variant="raised" onClick={() => navigate('/')}>
            Home
        </button>
        <button variant="raised" onClick={() => navigate('/signup')}>
            Sign Up
        </button>
      </div>
        );
}

export default LogIn;