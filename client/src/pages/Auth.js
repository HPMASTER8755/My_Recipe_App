import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Auth() {
  return (
    <div className='auth'>
      <Login/>
      <Register/>
    </div>
  )
}

export default Auth;


function Login() {
    const [username,setUsername]=useState("");
    const [password, setPassword]=useState("");

    const [_, setCookies]=useCookies(["access_token"]);

    const navigate=useNavigate();

    const onSubmit= async (event)=>{
        event.preventDefault();
        try{
            const response=await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/login",{username,password});

            setCookies("access_token",response.data.token);
            window.localStorage.setItem("userID",response.data.userID);
            navigate("/");
            
        }catch(err){
            console.error(err);
        }
    };   

  return (
    <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        value="Login"   
        onSubmit={onSubmit} 
    />
  )
}


function Register() {
    const [username,setUsername]=useState("");
    const [password, setPassword]=useState("");

    const onSubmit= async (event)=>{
        event.preventDefault();//prevent page refresh
        try{
            await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/register",{username,password});
            alert("Registeration Completed ! Now Login !")
        }catch(err){
            console.error(err);
        }
    };

  return (
    <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        value="Register"
        onSubmit={onSubmit}    
    />
  )
}

function Form({username,password,setPassword,setUsername,value,onSubmit}) {
  return (
    <div className='auth-container'>
    <form onSubmit={onSubmit}> 
      <h2>{value}</h2>
      <div className='form-group'>
          <label>Username</label>
          <input type='text' id='username' value={username} onChange={(event)=>setUsername(event.target.value)}/>
      </div>
      <div className='form-group'>
          <label>Password</label>
          <input type='password' id='password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
      </div>
      <button type='submit'>{value}</button>
    </form> 
  </div>
  )
}



