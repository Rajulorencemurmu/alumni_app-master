import {createContext,useState,useEffect} from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
    const [userId, setUserId] = useState("");
    // const [name, setName] = useState("");

    const logout = () => {
        setUserId("");
        // setName(""); // Clearing name on logout
    }

    // useEffect(() => {
    //     console.log('name in UserContext:', name);
    // }, [name]);

    return (
        <UserType.Provider value={{ userId, setUserId, logout}}>
            {children}
        </UserType.Provider>
    )
}


export {UserType,UserContext}