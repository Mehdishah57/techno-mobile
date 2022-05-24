/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './global/UserContext';
import Tab from './navigation/Tab';

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Tab />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
