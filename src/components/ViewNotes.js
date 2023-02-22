import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import NoteDiv from './NoteDiv';

function ViewNotes({session, growName}) {

    const [notes, setNotes] = useState([]);
    useEffect(()=>{
        getNotes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getNotes = async () => {

        const { data, error } = await supabase
            .from('grow_notes')
            .select()
            .eq('user_id', session.user.id)
        
        if (error){
            console.log(error)
        } 
        if (data) {
            setNotes(data);
        }
        
    }

    const displayNotes = () => {
        const noteList = [];

        for (let i=notes.length - 1; i>=0; i--){
            if (notes[i].grow_name === growName){
                let note = notes[i];
                let key = notes[i].id;
                noteList.push(<NoteDiv key={key} note={note} />);
            }
        } return noteList;

    }

    return(
        <div>
            {displayNotes()}
        </div>
    )
}

export default ViewNotes;