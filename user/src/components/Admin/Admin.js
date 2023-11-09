import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import './Admin.css';
import '../style.css';

function Admin(props) {
    // const [succ,setSucc]=useState()

    const navigate=useNavigate()
    const [user,setUser] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/admin')
            .then(res=>{
                if(res.data === "log succ as admin"){
                //    setSucc("okkk")
                // navigate()
                }
                else{
                        navigate('/login')
                }
            })
      
    });

    useEffect(()=>{
        axios.get('http://localhost:3001/getalluserdata')
            .then(result=> setUser(result.data))
            .catch(err => console.log(err))
    });
    return (
       <div className="main">
            <div className="container">
                <table>
                    <th>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Password</td>
                            <td>action</td>
                        </tr>
                    </th>
                    <tbody>
                       { user.map((user)=>

                       
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <button>edit</button>   
                            <button>delete</button>
                        </tr>
                       
                         )}
                    </tbody>
                </table>
            </div>
       </div>
    );
}


export default Admin;