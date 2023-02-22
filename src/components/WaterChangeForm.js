import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { supabase } from '../supabaseClient';


function WaterChangeForm({session, growName}) {

    const [message, setMessage] = useState("Add total nutrients and adjust pH within range before adding note.");
    const [formInfo, setFormInfo] = useState({calmag: "", silica: "", micro_nute: "",
                                    grow_nute: "", flower_nute: "", ph: "", ppm: "", 
                                    user_comment: "", temperature: "", humidity: ""});

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from("grow_notes")
            .insert({user_id: session.user.id, grow_name: growName, note_type: "Water Change", 
                     calmag: formInfo.calmag, silica: formInfo.silica, micro_nute: formInfo.micro_nute,
                     grow_nute: formInfo.grow_nute, flower_nute: formInfo.flower_nute, ph: formInfo.ph,
                     ppm: formInfo.ppm, user_comment: formInfo.user_comment, temperature: formInfo.temperature,
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
                <Form.Group className="mb-3" controlId="calmag">
                  <Form.Label>CalMag</Form.Label>
                  <Form.Control type="text" name="calmag" onChange={handleChange} value={formInfo.calmag} placeholder="per 5ml" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="silica">
                  <Form.Label>Silica</Form.Label>
                  <Form.Control type="text" name="silica" onChange={handleChange} value={formInfo.silica} placeholder="per 5ml" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="micro">
                  <Form.Label>Micro Nutrients</Form.Label>
                  <Form.Control type="text" name="micro_nute" onChange={handleChange} value={formInfo.micro_nute} placeholder="per 5ml" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="grow">
                  <Form.Label>Grow Nutrients</Form.Label>
                  <Form.Control type="text" name="grow_nute" onChange={handleChange} value={formInfo.grow_nute} placeholder="per 5ml" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="flower">
                  <Form.Label>Flower Nutrients</Form.Label>
                  <Form.Control type="text" name="flower_nute" onChange={handleChange} value={formInfo.flower_nute} placeholder="per 5ml" />
                </Form.Group>
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

export default WaterChangeForm;