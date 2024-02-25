import {createContext,useState} from "react";

const UserType = createContext();

const UserContext = ({children}) => {
    const [userId,setUserId] = useState("");
    
    const logout=()=>{
        setUserId('')
    }
    
    return (
        <UserType.Provider value={{userId,setUserId,logout}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType,UserContext}