import React, { useContext } from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetails from '../screens/ProductDetails';
import Sell from '../screens/Sell';
import Profile from '../screens/Profile';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Chat from '../screens/Chat';
import ChatList from '../screens/ChatList';
import { UserContext } from '../global/UserContext';
import Favourites from '../screens/Favourites';
import MyAds from '../screens/MyAds';
import ChangePhone from '../screens/ChangePhone';
import SubCategoryList from '../screens/SubCategoryList';
import CityList from '../components/Home/CityList';

const Stack = () => {
	const Stack = createNativeStackNavigator();
	return <Stack.Navigator
		screenOptions={() => ({
			headerShown: false,
		})}>
		<Stack.Screen name="Landing" component={Home} />
		<Stack.Screen name="Details" component={ProductDetails} />
		<Stack.Screen name='Login' component={Login} />
		<Stack.Screen name='SignUp' component={Signup} />
		<Stack.Screen name="SubCategory" component={SubCategoryList} />
		<Stack.Screen name="Cities" component={CityList} />
	</Stack.Navigator>
}

const ChatStack = () => {
	const Stack = createNativeStackNavigator()
	return <Stack.Navigator
		screenOptions={() => ({
			title: 'Chats',
		})}
	>
		<Stack.Screen name="List" component={ChatList} />
		<Stack.Screen options={() => ({})} name="Chat" component={Chat} />
	</Stack.Navigator>
}

const ProfileStack = () => {
	const Stack = createNativeStackNavigator()
	return <Stack.Navigator
		screenOptions={() => ({
			headerShown:false
		})}
	>
		<Stack.Screen name="Profile" component={Profile} />
		<Stack.Screen name="Favourites" component={Favourites} />
		<Stack.Screen name="MyAds" component={MyAds} />
		<Stack.Screen name="ChangePhone" component={ChangePhone} />
	</Stack.Navigator>
}

const Tab = () => {
	const [user] = useContext(UserContext)

	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false
			})}>
			<Tab.Screen
				name='Home'
				component={Stack}
				options={{
					tabBarLabel: 'Home',
					tabBarActiveTintColor: 'black',
					tabBarIcon: ({ color, size }) => <FontAwesome5 name='home' color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name='Chats'
				component={user._id ? ChatStack : Login}
				options={{
					tabBarLabel: 'Chat',
					tabBarActiveTintColor: 'black',
					tabBarIcon: ({ color, size }) => <FontAwesome5 name='envelope' color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name='Sell'
				component={user._id ? Sell : Login}
				options={{
					tabBarLabel: 'Sell',
					tabBarActiveTintColor: 'black',
					tabBarIcon: ({ color, size }) => <FontAwesome5 name='plus' color={color} size={size} />
				}}
			/>
			<Tab.Screen name='User' component={user._id ? ProfileStack : Login}
				options={{
					tabBarLabel: 'User',
					tabBarActiveTintColor: 'black',
					tabBarIcon: ({ color, size }) => <FontAwesome5 name='user' color={color} size={size} />
				}} />
		</Tab.Navigator>
	)
}

export default Tab;