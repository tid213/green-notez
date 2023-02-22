import leaf from '../images/leaf.png';
import grid from '../images/grid.svg';
import menu from '../images/menu.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Nav (){

    const navigate = useNavigate();
    const [expand, setExpand] = useState(false);

    const navExpand = (event) => {
        event.preventDefault();
        console.log("clicked")
        if (expand === false){
            setExpand(true);
        } else{
            setExpand(false);
        }
    }

    const navLink = (link) =>{
        if (link === 'signin'){
            navigate('/signin')
        }
        if (link === 'signup'){
            navigate('/signup')
        }
        if (link === 'forgotpassword'){
            navigate('/forgotpassword')
        }
        if (link === 'home'){
            navigate('/')
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
              <div className='nav-option1' onClick={navExpand}>
                <a onClick={() => navigate('/')}>Home</a>
              </div>
              <div className='nav-option2' onClick={navExpand}>
                <a onClick={() => navigate('/signup')}>Sign Up</a>
              </div>
              <div className='nav-option3' onClick={navExpand}>
                <a onClick={() => navigate('/forgotpassword')}>Forgot Password</a>
              </div>
              <div className='nav-option-special' onClick={navExpand}>
                <a onClick={() => navigate('/signin')}>Sign In</a>
              </div>
            </div>
            </div>
        </div>
    )
  }
    

}

export default Nav;