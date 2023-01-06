import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/Config";
import UserDataService from "../../services/user.services";
import { AdminContext } from "../../store/AdminContext";

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  // const [author, setAuthor] = useState("");
  // const [status, setStatus] = useState("Available");
  const {id, setUserId, } = useContext(AdminContext)
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (userName === "" || email === "" || phone === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newUser = {
      userName,
      email,
      phone,
      password
    };
    console.log(newUser);
    
    try {
      if (id !== undefined && id !== "") {
        await UserDataService.updateUser(id, newUser);
        // setUserId("");
        navigate('/admin')
        setMessage({ error: false, msg: "Updated successfully!" });

      } else {
        createUserWithEmailAndPassword(auth, email, password).then(result => {
      
          addDoc(collection(db, "users"), {
            id: result.user.uid,
            username: userName,
            email: email,
            phone: phone,
            password: password
          }).then((res) => {
            // setUser(res)
            navigate('/admin')
          })
          console.log(result)
        })
        // await createUserWithEmailAndPassword(auth, email, password)
        setMessage({ error: false, msg: "New User added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setUserName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await UserDataService.getUser(id);
      console.log("the record is :", docSnap.data());
      setUserName(docSnap.data().username);
      setEmail(docSnap.data().email);
      setPhone(docSnap.data().phone);
      setPassword(docSnap.data().password);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
    
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor"></InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor"></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor"></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          {/* <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup> */}
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
