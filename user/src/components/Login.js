import React, { useState } from 'react';
// import './Login.css';
import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials=true;
    const logsubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result => {console.log("login")
            if(result.data.Status ==='login success'){
                if(result.data.role === 'admin'){
                    navigate('/admin')
                }
                else{
                    navigate('/home')
                }
            }
          
                   
        })
       .catch(err => console.log(err))
    }
    return (
        <div className='main'>
              <div className="container">
                <div className="Head">
                    <h2>Login</h2>
                    </div>
                    <form action="">
                       <div className="input-sec">
                        <input type="text" 
                        name="" id="" 
                        placeholder='Enter email'
                        onChange={(e)=>setEmail(e.target.value)}/>

                        <input type="password" 
                        name="" id="" 
                        placeholder='Enter password'
                        onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <Link to="/home" id='log-btn' type="submit" onClick={logsubmit}> Login</Link>
                        </form>
                        <p>New user ? <br />
                            Click here to create an account
                            <Link to="/"
                            id='sign-btn'  type="submit">Signup</Link>
                        </p>
                    
               
            </div>
            
        </div>
    );
};

export default Login;