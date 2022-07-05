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
import SearchProvider from './global/SearchContext';
import FilterProvider from "./global/FilterContext";
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <UserProvider>
          <CityProvider>
            <FilterProvider>
              <SearchProvider>
                <MainCategoryProvider>
                  <SubCategoryProvider>
                    <NavigationContainer>
                      <Stack />
                    </NavigationContainer>
                  </SubCategoryProvider>
                </MainCategoryProvider>
              </SearchProvider>
            </FilterProvider>
          </CityProvider>
        </UserProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
