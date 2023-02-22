import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState({password: "", passwordRetype: ""});
    const [message, setMessage] = useState("");
    //const [userRecovery, setUserRecovery] = useState(false);

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };
    const handleSubmit = async (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        if (formInfo.password === formInfo.passwordRetype){
            const { data, error } = await supabase.auth
              .updateUser({ password: formInfo.password })
     
            if (data){
                alert("Password updated successfully!")

            } 
            if (error) alert("There was an error updating your password.")
        } else{ 
            setMessage("Passwords do not match!");
        }
        
    };

    return(
        <div>
            <NavBar />
            <p>{message}</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formInfo.password} onChange={handleChange} placeholder="New Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordRetype">
                <Form.Label>Re-Enter Password:</Form.Label>
                <Form.Control type="password" name="passwordRetype" value={formInfo.passwordRetype} onChange={handleChange} placeholder="Re-Enter New Password" />
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
                </Button>
            </Form>

        </div>
    )
}

export default ResetPassword;