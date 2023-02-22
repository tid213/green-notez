import leaf from '../images/leaf.png';
import menu from '../images/menu.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';


function UserNav ({username}){

    const navigate = useNavigate();
    const [expand, setExpand] = useState(false);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error);
        }
        navigate('/');
    }

    const navExpand = (event) => {
        event.preventDefault();
        console.log("clicked")
        if (expand === false){
            setExpand(true);
        } else{
            setExpand(false);
        }
    }


  if (expand === false){
    return(
        <div className='navbar-div'>
          <div className='header-logo'>
              <img src={leaf}></img>
              <h3>Green Notez</h3>
            </div>
            <div className='nav-icon' onClick={navExpand}>
                <img src={menu}/>
            </div>
        </div>
    )
  } else if (expand === true){
    return(
        <div>
          <div className='navbar-div'>
            <div className='header-logo'>
              <img src={leaf}></img>
              <h3>Green Notez</h3>
            </div>
              <div className='nav-icon' onClick={navExpand}>
                <img src={menu}/>
              </div>
          </div>
          <div className='navbar-div-expand'>
            <div className='nav-options'>
              <div className='navbar-username'>
                <p>{username}</p>
              </div>
              <div className='nav-option1' onClick={navExpand}>
                <a onClick={() => navigate('/dashboard')}>Dashboard</a>
              </div>
              <div className='nav-option2' onClick={navExpand}>
                <a onClick={() => navigate('/profile')}>Profile</a>
              </div>
              <div className='nav-option3' onClick={navExpand}>
                <a onClick={() => navigate('/manager')}>Manage Grows</a>
              </div>
              <div className='nav-option-special' onClick={navExpand}>
                <h3 onClick={handleSignOut}>Sign Out</h3>
              </div>
            </div>
            </div>
        </div>
    )
  }
    

}

export default UserNav;