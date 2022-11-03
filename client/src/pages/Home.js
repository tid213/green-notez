import React, { useEffect } from 'react';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';


function Home() {
    const [message, setMessage] = useState();

    useEffect(() => {
        fetch("http://localhost:9000/")
            .then(res => res.text())
            .then(res => setMessage(res));
      });

    return (
    <div>
      <NavBar />
      <div className='pageStyle'>
      <h1>Project Home {message}</h1>
      <Link to={'./login'}>
        <button variant="raised">
            Login
        </button>
      </Link>
      <Link to={'./signup'}>
        <button variant="raised">
            Sign Up
        </button>
      </Link>
      </div>
    </div>
    );
}
export default Home;