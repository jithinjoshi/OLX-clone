import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { UserContext } from '../../store/UserContext';
import {getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useNavigate } from 'react-router';
//import { storage } from '../../firebase/Config';
const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null)
  const {user} = useContext(UserContext);
  const date = new Date();
  const storage = getStorage();
  const storageRef = ref(storage, `images/${image}.${name}`);
  //const uploadTask = uploadBytesResumable(storageRef, image)
  const handleSubmit = ()=>{
        uploadBytes(storageRef, image).then(()=>{
        getDownloadURL(storageRef).then((url)=>{
          console.log(url)
        addDoc(collection(db, 'products'),{
          name,
          category,
          price,
          url,
          userId : user.uid,
          createdAt : date.toDateString()
        })
        navigate('/');
      })
      })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
              name="category"
              defaultValue="John"
            />
            <br />
              <label htmlFor="fname">Price</label>
              <br />
              <input className="input" 
              type="number" 
              id="fname" 
              value={price}
              onChange={(e)=>{setPrice(e.target.value)}}
              name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br/>
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
