import { createContext, useState } from "react";

//export const FirebaseContext = createContext(null)
export const AdminContext = createContext(null)

// const adminObj = {
//     email: "admin@gmail.com",
//     password: "admin123"
// }
export default function AContext({children}) {
    const [admin, setAdmin] = useState();
    const [userId, setUserId] = useState("");
    
    const getUserIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setUserId(id);
      };
    return(
        <AdminContext.Provider value={{admin, setAdmin, getUserIdHandler, setUserId, id: userId}}>
            {children}
        </AdminContext.Provider>
    )
}
