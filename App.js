/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Stack from './navigation/Navigation';
import UserProvider from './global/UserContext';
import ThemeProvider from './global/ThemeContext';
import CityProvider from './global/CityContext';
import SubCategoryProvider from './global/SubCategoryContext';
import MainCategoryProvider from './global/MainCategoryContext';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchProvider from './global/SearchContext';


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <UserProvider>
          <CityProvider>
            <SearchProvider>
              <MainCategoryProvider>
                <SubCategoryProvider>
                  <NavigationContainer>
                    <Stack />
                  </NavigationContainer>
                </SubCategoryProvider>
              </MainCategoryProvider>
            </SearchProvider>
          </CityProvider>
        </UserProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
