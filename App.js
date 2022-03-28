/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from './global/UserContext';
import AuthTab from './navigation/AuthTab';

import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshUser from "./services/refreshUser";
import DefaultTab from './navigation/DefaultTab';

const App = () => {
  const [user, setUser] = useState({});

  const fetchUser = useRef(null);
  fetchUser.current = async() => {
    if (user && user._id) return;
    const token = await AsyncStorage.getItem("fyptoken");
    if (!token) return;
    const [data, error] = await refreshUser(token);
    if (!error) return setUser({ ...data });
    AsyncStorage.removeItem("fyptoken");
  }

  useEffect(()=>{
    fetchUser.current();
  },[])

  return (
    <UserContext.Provider value={[user, setUser]}>
      <NavigationContainer>
        {user._id? <AuthTab />: <DefaultTab />}
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
