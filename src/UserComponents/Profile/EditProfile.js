import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { UserContext } from '../../store/UserContext';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, getDocs, limit, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useNavigate } from 'react-router';
import { stringify } from '@firebase/util';
//import { storage } from '../../firebase/Config';
const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState([])
  const [length, setLength] = useState()
  const [url, setUrl] = useState()

  // const [name, setName] = useState();
  const [image, setImage] = useState(null)
  const { user } = useContext(UserContext);
  const date = new Date();
  const storage = getStorage();
  const storageRef = ref(storage, `profileImg/${image}.${date.getTime()}`);
  //const uploadTask = uploadBytesResumable(storageRef, image)

  console.log(db);

  useEffect(() => {
    const profileRef = collection(db, 'profile')
    const q = query(profileRef, orderBy("createdAt"));
    getDocs(q).then(snapshot => {
      const profiles = snapshot.docs.map((res) => {
        return {
          ...res.data(),
          id: res.userId
        }
      })
      console.log(profiles);
      setLength(profiles.length)
      setProfile(profiles)
      // setUrl(url)
    })
  }, [])
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadBytes(storageRef, image).then(() => {
      getDownloadURL(storageRef).then(async (url) => {
        console.log(url)

        await addDoc(collection(db, 'profile'), {
          // name,
          url,
          userId: user.uid,
          createdAt: date
        })
        const profileRef = collection(db, 'profile')
        const q = query(profileRef, orderBy("createdAt"));
        getDocs(q).then(snapshot => {
          const profiles = snapshot.docs.map((res) => {
            return {
              ...res.data(),
              id: res.userId
            }
          })
          console.log(profiles);
          setLength(profiles.length)
          setProfile(profiles)
          // setUrl(url)
        })
        // window.location.reload()
        navigate('/profile');
      })
    })
  }

  const handleSubmits = () => {
    uploadBytes(storageRef, image).then(() => {
      getDownloadURL(storageRef).then((url) => {
        const urlData = stringify(url)
        console.log(urlData)
        const docRef = doc(db, "profile", "fqsqd8fUOZTmZknYEivR");
        const data = { url: urlData };
        updateDoc(collection(docRef, data))
        // navigate('/');
      })
    })
  }
  return (
    <Fragment>
      <Header />
      {/* {profile.map((data)=>{
        return <div > */}
      <div style={{ paddingTop: "30px",marginLeft:"600px",borderRadius:'50%'}}>
        {profile[length - 1] && <img style={{ height: "200px" }} src={profile[length - 1].url} alt="some" />}
      </div>
      {/* </div>
          })} */}
      <card>
        <div className="centerDiv">
          <br />
          <img alt="profile" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

          <br />
          <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">update</button>

        </div>
      </card>
    </Fragment>

    // <div class="card">
    //             <img src={image ? URL.createObjectURL(image) : 'https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png'} alt="John" style={{width:'100%'}}/>
    //                <p><input style={{marginTop:'30px'}} onChange={(e) => { setImage(e.target.files[0]) }} type="file" name="" id="" /></p>
    //                <p><button onClick={handleSubmit}>Update Profile</button></p>
    //         </div>

    
  );
};

export default Profile;
