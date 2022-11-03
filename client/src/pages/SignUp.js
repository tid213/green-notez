import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function SignUp() {
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9000/signup/")
            .then(res => res.text())
            .then(res => setMessage(res));
      });

    return(
        <div className='sign-up'>
            <NavBar />
            <h1>{message}</h1>
                <button variant="raised" onClick={() => navigate('/')}>
                Home
                </button>
                <button variant="raised" onClick={() => navigate('/login')}>
                Login
                </button>
        </div>
    );
}

export default SignUp;