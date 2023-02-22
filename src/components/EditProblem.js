import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function EditProblem({noteID}) {

    const [formInfo, setFormInfo] = useState({ph: "", ppm: "", user_comment: ""});

    useEffect(() => {
        getNoteData();
    }, [])

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from("grow_notes")
            .update({ph: formInfo.ph, ppm: formInfo.ppm, user_comment: formInfo.user_comment})
            .eq('id', noteID)
        if (error){
            console.log(error)
        }  refreshPage();
      }

      const getNoteData = async () => {
        const {data, error} = await supabase
            .from("grow_notes")
            .select()
            .eq("id", noteID)

            if(error){
                console.log(error)
            }
            setFormInfo({ph: data[0].ph, ppm: data[0].ppm, user_comment: data[0].user_comment})
      }

      const refreshPage = ()=>{
        window.location.reload();
     }

    return(
        <div className='add-note-form'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="ph">
                <Form.Label>pH</Form.Label>
                <Form.Control type="text" name="ph" onChange={handleChange} value={formInfo.ph} placeholder="test pH" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ppm">
                <Form.Label>PPM</Form.Label>
                <Form.Control type="text" name="ppm" onChange={handleChange} value={formInfo.ppm} placeholder="test PPM" />
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

export default EditProblem;