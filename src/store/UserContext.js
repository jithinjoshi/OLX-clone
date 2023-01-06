import { createContext, useState } from "react";

//export const FirebaseContext = createContext(null)
export const UserContext = createContext(null)

export default function UContext({children}) {
    const [user, setUser] = useState();

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
