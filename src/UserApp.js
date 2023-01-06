import React, { useEffect, useContext } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
/**
 * ?  =====Import Components=====
 */
import Home from './UserPages/Home';
import Login from './UserPages/Login';
import Signup from './UserPages/Signup'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from './store/UserContext';
//import { app } from './firebase/Config';
import Create from './UserPages/Create';
import ViewPost from './UserPages/ViewPost';
import ProfilePage from './UserPages/Profile';
import ShowProfile from './UserPages/ShowProfile'
//////////////////////////////////////////////////


function UserApp() {
  const auth = getAuth();
  const {setUser} = useContext(UserContext)
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  })

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/view" element={<ViewPost/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/showprofile" element={<ShowProfile/>}/>


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default UserApp;
