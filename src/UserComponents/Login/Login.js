import React, { useState } from 'react';
//import LoginPage from '../../Pages/Login';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'
//import { FirebaseContext } from '../../store/Context'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';



//import { auth } from '../../firebase/Config';
function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  //const firebase = useContext(FirebaseContext)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleLogin = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((result)=>{
      navigate('/')
      
    }).catch((error)=>{
      console.log(error.message);
      if(error.message === 'Firebase: Error (auth/user-not-found).'){
        // alert("invalid username or password")
        Swal.fire({
          title: 'Error!',
          text: 'Invalid username or password',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }else if(error.message === 'Firebase: Error (auth/internal-error).'){
        Swal.fire({
          title: 'Error!',
          text: 'You Must Enter the password',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }else if(error.message === 'Firebase: Error (auth/missing-email).'){
        Swal.fire({
          title: 'Error!',
          text: 'You Must Enter the Email',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      
    })
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
        <button onClick={()=>
          navigate('/signup')
          }>Signup</button>
      </div>
    </div>
  );
}

export default Login;
