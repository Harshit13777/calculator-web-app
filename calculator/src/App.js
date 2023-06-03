import logo from './logo.svg';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React,{ useEffect } from 'react';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/signup'

function App() {



  return (
    <>
  
            <Routes>
                  <Route exact path='/' element={<Home/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/signup' element={<Signup/>}/>
            </Routes>
        
    </>
  );
}

export default App;
