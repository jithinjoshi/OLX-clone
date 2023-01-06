import React, { useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import { useNavigate } from 'react-router';
//import {AuthContext} from '../../store/Context';
import { getAuth, signOut } from 'firebase/auth';
import {AdminContext} from '../../store/AdminContext'

import userDataService from '../../services/user.services'

function Header(props) {
  //const {user, setUser} = useContext(AuthContext);
  const auth = getAuth();
  const user = auth.currentUser;

  const [search,setSearch] = useState('');
  const [users,setUsers] = useState([])

  const searchHandler = ((e)=>{
    console.log(e.target.value);
    setSearch(e.target.value)
  })

  const searchDataHandler = (()=>{
    let searchValue = search;

    const getAllData = async ()=>{
      const data = await userDataService.getAllUser();
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getAllData();

    props.searchData(searchValue)

  })
  
  const navigate = useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find users"
              onChange={searchHandler}
            />
          </div>
          <div className="searchAction" onClick={searchDataHandler}>
            <Search  color="#ffffff" ></Search>
          </div>
        </div>
        <div className="language">
          <span > ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span >{user ? 'Account' : <button onClick={()=>navigate('/admin/login')}>Login</button>}</span>
          <hr />
        </div>
        <span onClick={()=>{

          signOut(auth).then(()=>{
            navigate('/admin/login')
          })
        }}>{user ? 'Logout' : ''}</span>
        <div >

        </div>
      </div>
    </div>
  );
}

export default Header;
