import React, { useContext, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { auth } from "../../firebase/Config";
import UserDataService from "../../services/user.services";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../store/AdminContext";

const UserList = () => {
  const [users, setUsers] = useState([]);

  
  const {setUserId, admin, getUserIdHandler} = useContext(AdminContext);
  console.log(admin);
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await UserDataService.getAllUser();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await UserDataService.deleteUser(id);
    getUsers();
  };
  return (
    <>
      {admin!="" && 
      <div>
      <div className="mb-2">
        <Button variant="dark edit" onClick={(e)=>{
          e.preventDefault()
          navigate("/admin/addUser")
        }}>
          Add User
        </Button>
      </div>
        
      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>User</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.username}</td>
                <td>{doc.phone}</td>
                <td>{doc.email}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => {
                      getUserIdHandler(doc.id)
                        navigate("/admin/addUser")}
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      </div>}
    </>
  );
};

export default UserList;
