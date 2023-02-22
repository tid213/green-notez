import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserNav from '../components/UserNav';

function Profile({session}){

    const {user} = session;
    const [message, setMessage] = useState("Update User Info")
    const [username, setUsername] = useState(null)
    const [formInfo, setFormInfo] = useState({username: "", full_name: ""});

    useEffect(() =>{
        getProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    const handleChange = (event) => {
        setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
      };

    const getProfile = async () => {
        let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

        if (error && status !== 406) {
            throw error
          }
        if (data) {
            setUsername(data.username)
          }
        
    }

    const updateProfile = async (e) => {
        const time = new Date(Date.now()).toISOString();
        e.preventDefault();
        const { data, error } = await supabase
            .from('profiles')
            .upsert({ id: user.id, updated_at: time,
                username: formInfo.username, full_name: formInfo.full_name })
            .select()
        if (error){
            console.log(error)
        }
        if (data){
            setMessage("User Updated!")
        }
    }

    return(
        <div>
            <UserNav />
            <div className='profileForm'>
                <div>
                <h1>{message}</h1>
                </div>
                <div>
                <Form onSubmit={updateProfile}>
                <Form.Group className="mb-3" controlId="username">
                <Form.Label>Update Username</Form.Label>
                <Form.Control type="text" name="username" onChange={handleChange} value={formInfo.username} placeholder={username} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="full_name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="full_name" value={formInfo.full_name} onChange={handleChange} placeholder="Optional" />
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
                </Button>
                </Form>
                </div>
            </div>
        </div>
    )


}

export default Profile;