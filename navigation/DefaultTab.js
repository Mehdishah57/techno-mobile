import React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const DefaultTab = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator 
		screenOptions={({route})=>({
			headerShown:false
		})}>
			<Tab.Screen name='Home' component={Home} />
			<Tab.Screen name='Login' component={Login} />
			<Tab.Screen name='SignUp' component={Signup} />
		</Tab.Navigator>
	)
}

export default DefaultTab;