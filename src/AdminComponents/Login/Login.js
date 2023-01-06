import React, { useContext, useState } from 'react';
//import LoginPage from '../../Pages/Login';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'
import { AdminContext } from '../../store/AdminContext'
import { signInWithEmailAndPassword, getAuth, EmailAuthProvider } from 'firebase/auth';


//import { auth } from '../../firebase/Config';
function Login() {
  let credential = EmailAuthProvider.credential("admin@gmail.com", "admin123");
  
  console.log("credential==================");
  console.log(credential);
  const adminObj = {
    email: "admin@gmail.com",
    password: "admin123"
}

  const auth = getAuth();
  const navigate = useNavigate();
  const {admin, setAdmin} = useContext(AdminContext)
  // let emaild = adminDetails.email
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleLogin = (e)=>{
    e.preventDefault();
    // console.log(adminDetails)
    // if(adminObj.email === email && adminObj.password === password){
    //   navigate('/admin')

    // }
    {(adminObj.email === email && adminObj.password === password) && signInWithEmailAndPassword(auth, email, password).then((result)=>{
      console.log(result)
      setAdmin(result)
      navigate('/admin')
    }).catch((error)=>{
      alert(error.message)
    })}
  }
  
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" alt='img' src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        {/* <button onClick={()=>
          navigate('/signup')
          }>Signup</button> */}
      </div>
    </div>
  );
}

export default Login;
