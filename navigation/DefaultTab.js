import React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from '../screens/ProductDetails';

const DefaultStack = () => {
	const Stack = createNativeStackNavigator();
	return <Stack.Navigator 
	screenOptions={({route})=>({
		headerShown:false
	})}>
		<Stack.Screen name="Home" component={Home}/>
		<Stack.Screen name="Details" component={ProductDetails} />
	</Stack.Navigator>
}

const DefaultTab = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator 
		screenOptions={({route})=>({
			headerShown:false
		})}>
			<Tab.Screen name='Stack' component={DefaultStack} />
			<Tab.Screen name='Login' component={Login} />
			<Tab.Screen name='SignUp' component={Signup} />
		</Tab.Navigator>
	)
}

export default DefaultTab;