import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { db } from '../../firebase/Config';
import { PostContext } from '../../store/PostContext';
import './Post.css';

function Posts() {
  // const complete = true;
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext)
  const navigate = useNavigate();
  useEffect(()=>{
    getDocs(collection(db, 'products')).then(snapshot=>{
      const allPost = snapshot.docs.map((product)=>{
        return{
          ...product.data(),
          id : product.id
        }
      })
    
      //console.log(allPost);
      setProducts(allPost);

    })
  })
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div> 
       <div className="cards">

        {products.map((product)=>{
         return <div
            className="card"
            
          >
            <div className="favorite">
    
            </div>
            <div className="image">
              <img onClick={()=>{
                setPostDetails(product);
                navigate('/view')}
                } 
                src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
         
        })
}
</div>
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
     
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Posts;
