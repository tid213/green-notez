import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import NoteDiv from '../components/NoteDiv';
import EditOrDeleteNote from './EditOrDeleteNote';

function DashboardNoteDisplay ({session, growName}) {

    const [notes, setNotes] = useState([]);
    const [toggleClose, setToggleClose] = useState("off");
    const [noteID, setNoteID] = useState("off");

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

    const toggleOnOrOff = (onOrOff) => {
        if (onOrOff === "off"){
            setNoteID("off");
        }

    }

    const getNoteID = (noteid) => {
        setNoteID(noteid)
    }

    const loadEditOrDelete = () => {
        if (noteID != "off"){
            window.scrollTo(0, 0);
            return(<EditOrDeleteNote noteID={noteID} toggleOnOrOff={toggleOnOrOff}/>)
        }
    }

    const displayNotes = () => {
        const noteList = [];
        for (let i=notes.length - 1; i>=0; i--){
                let note = notes[i];
                let key = notes[i].id;
                noteList.push(<NoteDiv getNoteID={getNoteID} key={key} note={note} />);
            
        } return noteList;

    }

    const sortGrowNotes = () => {
        const noteList = [];

        for (let i=notes.length - 1; i>=0; i--){
            if (notes[i].grow_name === growName){
                let note = notes[i];
                let key = notes[i].id;
                noteList.push(<NoteDiv getNoteID={getNoteID} key={key} note={note} />);
            }
        } return noteList;
    }

    if (growName === "Recent Notes"){
        return(
            <div className='grow-notes'>
                {loadEditOrDelete()}
                {displayNotes()}
            </div>
        )
    } else{
        return(
            <div className='grow-notes'>
                {loadEditOrDelete()}
                {sortGrowNotes()}
            </div>
        )
    }
    
}


export default DashboardNoteDisplay;