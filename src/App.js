import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import { useNavigate } from 'react-router-dom';

import { supabase } from './supabaseClient';
import ResetPassword from './pages/ResetPassword';

function App() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [event, setEvent] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setEvent(event)
    })
  }, []);

  console.log(event);
  console.log(session);

  const authenticateRouter = () => {
    if (event === "PASSWORD_RECOVERY"){
      return <ResetPassword />
    } else{
      if (session){
      return <AuthenticatedApp session={session} />
    } 
      return <UnauthenticatedApp />
    } 
  }
  return (
    <div>
      {authenticateRouter()}
    </div>
  )
}

export default App;