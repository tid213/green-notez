import React, { useEffect } from 'react';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function ForgotPassword() {
    return(
        <div>
            <NavBar />
            <h1>Forgot Password</h1>
        </div>
    );
}

export default ForgotPassword;