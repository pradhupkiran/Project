import React,{useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'

function Home(props) {
    const navigate = useNavigate()


    useEffect(()=>{
        axios.get('http://localhost:3001/home')
            .then(result =>{
                console.log(result);
               
            })
            .catch(err => console.log(err))
    })


    return (
        <div>
            <h3>home</h3>
        </div>
    );
}

export default Home;

