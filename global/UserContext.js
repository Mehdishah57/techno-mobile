import React, {useState, useEffect, useRef} from "react";
import refreshUser from "../services/refreshUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "../socket/socket";

export const UserContext = React.createContext({});

const UserProvider = ({children}) => {
    const [user, setUser] = useState({});

    const fetchUser = useRef(null);
    fetchUser.current = async() => {
      if (user && user._id) return;
      const token = await AsyncStorage.getItem("fyptoken");
      if (!token) return;
      const [data, error] = await refreshUser(token);
      if (!error) {
        socket.emit("joinMyId",data._id)
        return setUser({ ...data })
      };
      AsyncStorage.removeItem("fyptoken");
    }
  
    useEffect(()=>{
      fetchUser.current();
    },[])

    return <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>
}

export default UserProvider;