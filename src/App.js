import React from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from './NavBar';
import './App.css'
import Meals from './Meals'

function App(){
  return(
   <div>
    <NavBar></NavBar>
    <Outlet></Outlet>
   
    <Meals></Meals>
    </div>

  )
}
export default App;
