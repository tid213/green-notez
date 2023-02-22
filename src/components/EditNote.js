import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';
import EditDailyCheck from './EditDailyCheck';
import EditWaterChange from './EditWaterChange';
import EditProblem from './EditProblem';


function EditNote({noteID}) {

    const [noteType, setNoteType] = useState("off");

    useEffect(()=>{
        selectNoteData();
    }, [])

    const selectNoteData = async () => {

        const {data, error} = await supabase 
            .from("grow_notes")
            .select()
            .eq('id', noteID)

            if (error){
                return error;
            }
            setNoteType(data[0].note_type)


    }

    if (noteType === "Daily Check"){
        return(<EditDailyCheck noteID={noteID}/>)
    }
    if (noteType === "Water Change"){
        return(<EditWaterChange noteID={noteID} />)
    }
    if (noteType === "Problem Log"){
        return(<EditProblem noteID={noteID} />)
    }
}

export default EditNote;