import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

function LogIn() {
    const [message, setMessage] = useState("");
    const [formInfo, setFormInfo] = useState({email: "", password: ""});
    const [inputError, setInputError] = useState("");
    const navigate = useNavigate();
    console.log("login loaded");    
    useEffect(() => {
        fetch("http://localhost:9000/login/")
            .then(res => res.text())
            .then(res => setMessage(res));
      }, []);

      const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };
      const handleSubmit = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        axios
        .post("http://localhost:9000/login/", formInfo)
        .then(function (response) {
          console.log(response);
          if (response){
            navigate("/dashboard");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        //setFormInfo({name: "", email: ""});
      };

    return (
      <div>
        <NavBar />
        <h1>{message}</h1>
        <p>{inputError}</p>
        <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="text" name="email" value={formInfo.email} onChange={handleChange} />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={formInfo.password} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
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