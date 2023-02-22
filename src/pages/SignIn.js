import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { supabase } from '../supabaseClient';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import grid from '../images/grid.svg';
import gmail from '../images/gmail.svg';
import Nav from '../components/Nav';


function SignIn() {
    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");

    console.log("signin loaded")
    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email: formInfo.email,
            password: formInfo.password,
          })
          if (error){
            setMessage("Wrong Email or Password!");
          } else{
            navigate('/dashboard');
          }
      };

      const googleSignIn = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
      }

    return (
        <div>
          <Nav />
          <div className='page-header'>
          <h2>Sign In</h2>
          </div>
            <div className='profileForm'>
            <p>{message}</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" name="email" onChange={handleChange} value={formInfo.email} placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formInfo.password} onChange={handleChange} placeholder="password" />
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
                </Button>
            </Form>
            </div>
            <div className='google-signin'>
              <p>Or sign in with your Google account</p>
              <img src={gmail} onClick={googleSignIn}></img>
            </div>
            <div className='footer'>
                <p>Green Notes. 2022</p>
            </div>
            
        </div>
    );
}

export default SignIn;