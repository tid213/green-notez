import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:9000/dashboard/")
            .then(res => res.text())
            .then(res => setMessage(res));
      }, [message]);

    return (
        <div>
            <NavBar />
            <h1>Dashboard {message}</h1>
            <button variant="raised" onClick={() => navigate('/signout')}>
            Sign Out
            </button>
        </div>
    );
}

export default Dashboard;