import React, { useEffect, useContext } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
/**
 * ?  =====Import Components=====
 */

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AdminContext } from './store/AdminContext';
//import { app } from './firebase/Config';
//////////////////////////////////////////////////
import AdminLogin from './AdminPages/Login';
import AdminHome from './AdminPages/Home';
import AddUser from './AdminPages/AddUser';

function AdminApp() {
  const auth = getAuth();
  const {setUser} = useContext(AdminContext)
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  })

  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/admin" element={<AdminHome />}/>
      <Route path="/admin/login" element={<AdminLogin/>}/>
      <Route path="/admin/addUser" element={<AddUser/>}/>
      {/* <Route path="/admin/addUser" element={<AddUser/>}/> */}

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AdminApp;
