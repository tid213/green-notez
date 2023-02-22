import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

function Problem({session, growName}) {

    const [message, setMessage] = useState("Take measurements and describe problem");
    const [formInfo, setFormInfo] = useState({ph: "", ppm: "", user_comment: "", temperature: "", humidity: ""});

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from("grow_notes")
            .insert({user_id: session.user.id, grow_name: growName, note_type: "Problem Log", 
            ph: formInfo.ph, ppm: formInfo.ppm, user_comment: formInfo.user_comment, temperature: formInfo.temperature,
            humidity: formInfo.humidity})
        if (error){
            console.log(error)
        }  refreshPage();
      }

      const refreshPage = ()=>{
        window.location.reload();
     }

    return(
        <div className='add-note-form'>
            <p>{message}</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="ph">
                <Form.Label>pH</Form.Label>
                <Form.Control type="text" name="ph" onChange={handleChange} value={formInfo.ph} placeholder="test pH" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ppm">
                <Form.Label>PPM</Form.Label>
                <Form.Control type="text" name="ppm" onChange={handleChange} value={formInfo.ppm} placeholder="test PPM" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="temperature">
                  <Form.Label>Temperature</Form.Label>
                  <Form.Control type="text" name="temperature" onChange={handleChange} value={formInfo.temperature} placeholder="Inside tent temp." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="humidity">
                  <Form.Label>Humidity</Form.Label>
                  <Form.Control type="text" name="humidity" onChange={handleChange} value={formInfo.humidity} placeholder="Inside tent humidity." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Add comment</Form.Label>
                <Form.Control as="textarea" rows={3} name="user_comment" onChange={handleChange} value={formInfo.user_comment}  />
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
                </Button>
            </Form>
        </div>
    )
}

export default Problem;