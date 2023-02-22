import React, { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import UserNav from '../components/UserNav';
import EditOrDeleteGrow from '../components/EditOrDeleteGrow';


function GrowManager({session}) {

    const [growList, setGrowList] = useState({});
    const [userName, setUserName] = useState("");
    const [growSelect, setGrowSelect] = useState("Choose Grow");

    useEffect(()=> {
        getGrowList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUserName = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('id', session.user.id)
        
        if (error){
            console.log(error)
        } 
        setUserName(data[0].username)
    }

    const getGrowList = async ()=>{
        const { data, error } = await supabase
            .from('grow_id')
            .select(`id, user_id, grow_name`)
            .eq('user_id', session.user.id)

        if (error){
            console.log(error);
        }
        if (data){
            setGrowList(data);
            getUserName();
        }

    }

    const growSelector = () => {
        let createDropdown = [];
        let getGrowID;
        for (let i=0; i<growList.length; i++){
            let key = i;
            let selection = growList[i].grow_name;
            createDropdown.push(<Dropdown.Item key={key} onClick={()=>setGrowSelection(growList[i].id)}>{selection}</Dropdown.Item>)
        }
        return createDropdown;

    }

    const setGrowSelection = (select) => {
        setGrowSelect(select);
    } 

    const loadGrowOptions = () => {
        if (growSelect != "Choose Grow"){
            return(<EditOrDeleteGrow closeGrowOptions={closeGrowOptions} session={session} growID={growSelect} />)
        }

    }

    const closeGrowOptions = (onOrOff) => {
        if (onOrOff === "off"){
            setGrowSelect("Choose Grow");
        }
    }


    return(
        <div>
            <UserNav username={userName} />
            <div className='grow-manager'>
            <div className='grow-manager-title'>
            <h3>Choose Grow to Edit</h3>
            </div>
            <div className='grow-manager-dropdown'>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                {growSelect}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {growSelector()}
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <div>
              {loadGrowOptions()}
            </div>
            </div>
        </div>
    )

}

export default GrowManager;