
import './App.css';
import PodcastList from './components/CardList';
import Seasons from "./components/Seasons"
// import Supa from './config/SupabaseClient';
// import { Supabase } from './config/SupabaseClient';
// import { useState, useEffect } from 'react';
// import { SupabaseClient } from '@supabase/supabase-js';

export default function App() {
  // const [signUpState, setSignUpState] = useState('SignPhase')
  // useEffect(() => {
  //   const authListener = Supabase.auth.onAuthStateChange((event, session) => {
  //     if (event === "SIGNED_IN" && session) {
  //       console.log("User signed in successfully:", session.user.email);
  //       setSignUpState('startPhase')
  //     }
  //   });
  //   return () => {
  //     authListener.unsubscribe;
  //   };
  // }, [])
  return (
    <>
    {/* {signUpState ==='SignPhase' && <Supa />}  */}
       {/* { signUpState ==='startPhase' && <div className="app"></div>} */}
        <PodcastList/>
        <Seasons />
        {/* <SupabaseClient /> */}
       
    </>
  );
}