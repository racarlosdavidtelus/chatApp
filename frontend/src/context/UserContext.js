import React, {useContext, useState} from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser(){
    return useContext(UserContext)
}

export function useUserUpdate(){
    return useContext(UserUpdateContext)
}

export function UserProvider({children}){
    const [userData,setUserData] = useState({});

    function handlerUserData(data){
        setUserData(data);
    }

    return (
        <UserContext.Provider value={userData}>
            <UserUpdateContext.Provider  value={handlerUserData}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}