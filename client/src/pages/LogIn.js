import React, { useEffect } from 'react';
import { useState } from 'react';

function LogIn() {
    const [message, setMessage] = useState();

    useEffect(() => {
        fetch("http://localhost:9000/login/")
            .then(res => res.text())
            .then(res => setMessage(res));
      });

    return (<h1>{message}</h1>);
}

export default LogIn;