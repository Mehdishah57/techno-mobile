import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AuthTab = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator 
		screenOptions={({route})=>({
			headerShown:false
		})}>
			<Tab.Screen name='Home' component={Home} />
			<Tab.Screen name='User' component={Profile} />
		</Tab.Navigator>
	)
}

export default AuthTab;