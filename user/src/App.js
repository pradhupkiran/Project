
// import './App.css';\
// import Signup from './components/Signup'
import Main from './components/Main'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login'
import Home from './components/Home'
import Admin from './components/Admin/Admin'


function App() {
  return (
    <div >
       
      
        <BrowserRouter>
            
                <Routes>
                    <Route path="/" element={<Signup/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/home' element={<Home/>}></Route>
                    <Route path='/admin' element={<Admin/>}></Route>
                </Routes>
            </BrowserRouter>
  

    </div>
  );
}

export default App;
