import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase/Config';
import { PostContext } from '../../store/PostContext';

import './View.css';
function View() {
  const [userDetails, setUserDetails] = useState();
  const {postDetails} = useContext(PostContext);
  
   useEffect(()=>{
    const {userId } = postDetails
    //const userId = getDocs(collection(db, 'products'));
    
     getDocs(query(collection(db, 'users'), where('id','==',userId))).then((res)=>{
      res.forEach(doc=>{
        setUserDetails(doc.data());
      })
      //console.log(userDetails)
    })   
   })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>Tue May 04 2021</span>
        </div>
      {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>Phone No : {userDetails.phone}</p>
        </div>  }
      </div>
    </div>
  );
}
export default View;
