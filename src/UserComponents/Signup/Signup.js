import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import Logo from '../../olx-logo.png';
import { UserContext } from '../../store/UserContext';
import './Signup.css';
import {db } from '../../firebase/Config';

export default function Signup() {
  const auth = getAuth();
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit,setIsSubmit] = useState(false)
  //const firebase = useContext(FirebaseContext);
  const errors = {};
  const [formErrors,setFormErrors]=useState({});

  const validate=(username,email,phone,password)=>{
    
    const regexUsername = /^[A-Za-z][A-Za-z0-9_ ]{4,12}$/i; 
      const regexMail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if(!username){
        errors.username= 'username is required';
        }else if(!regexUsername.test(username)){
          errors.username="Username is not valid"
      }
      if(!email){
        errors.email="email is required"
  
      }else if(!regexMail.test(email)){
        errors.email="Not a valid email format"
      }
      if(!phone){
        errors.phone="phone number is required"
      }else if(phone.length!==10){
        errors.phone="Phone number must be 10 digit"
      }
      if(!password.trim()){
        errors.password="password is required"
      }else if(password.trim().length<4){
        errors.password="Password must be more than 4 characters"
      }else if(password.trim().length>10){
        errors.password="Password should not exceed 10 characters"
      }
      return errors
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(username,email,phone,password));
    setIsSubmit(true)
    
    createUserWithEmailAndPassword(auth, email, password).then(result => {
      addDoc(collection(db, "users"), {
        id: result.user.uid,
        username: username,
        email: email,
        phone: phone
      }).then((res) => {
        setUser(res)
        navigate('/login')
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" alt='' src={Logo}></img>
        <form onSubmit={handleSubmit}>
        
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <p style={{color:"red"}}>{formErrors.username}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <p style={{color:"red"}}>{formErrors.email}</p>
          <br />
          
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <p style={{color:"red"}}>{formErrors.phone}</p>
          <br />
          
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <p style={{color:"red"}}>{formErrors.password}</p>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/')} style={{ fontSize: '0.8em' }}>Return to Home</button>
      </div>
    </div>
  );
}
