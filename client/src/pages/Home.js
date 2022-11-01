import React, { useEffect } from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';


function Home() {
    const [message, setMessage] = useState();

    useEffect(() => {
        fetch("http://localhost:9000/")
            .then(res => res.text())
            .then(res => setMessage(res));
      });

    return (
    <div className="App">
      <h1>Project Home {message}</h1>
      <Link to={'./login'}>
        <button variant="raised">
            Login
        </button>
      </Link>
    </div>
    );
}
export default Home;