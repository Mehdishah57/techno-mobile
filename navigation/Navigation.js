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
import { ThemeContext } from '../global/ThemeContext';
import SearchHome from '../screens/SearchHome';
import LocationSection from '../components/Sell/LocationSection';
import SearchSection from "../components/Home/SearchSection";
import ProductBids from '../screens/ProductBids';
import Verify from '../screens/Verify';
import Filters from '../screens/Filters';


const VerifyStack = () => {
	const Stack = createNativeStackNavigator();
	return <Stack.Navigator
	screenOptions={{
		headerShown: false
	}}
>
	<Stack.Screen name='Verify' component={Verify} />
</Stack.Navigator>
}

const HomeStack = () => {
	const Stack = createNativeStackNavigator();
	return <Stack.Navigator
		screenOptions={() => ({
			headerShown: false,
		})}>
		<Stack.Screen name="Landing" component={Home} />
		<Stack.Screen name='Login' component={Login} />
		<Stack.Screen name='SignUp' component={Signup} />
		<Stack.Screen name="SubCategory" component={SubCategoryList} />
		<Stack.Screen name="Cities" component={CityList} />
		<Stack.Screen name="SearchHome" component={SearchHome} />
	</Stack.Navigator>
}

const ChatStack = () => {
	const Stack = createNativeStackNavigator()

	return <Stack.Navigator
		screenOptions={() => ({
			headerShown: false,
		})}
	>
		<Stack.Screen name="List" component={ChatList} />
	</Stack.Navigator>
}

const ProfileStack = () => {
	const Stack = createNativeStackNavigator()

	return <Stack.Navigator
		screenOptions={() => ({
			headerShown: false
		})}
	>
		<Stack.Screen name="Profile" component={Profile} />
		<Stack.Screen name="Favourites" component={Favourites} />
		<Stack.Screen name="MyAds" component={MyAds} />
		<Stack.Screen name="ChangePhone" component={ChangePhone} />
	</Stack.Navigator>
}

const SellStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={() => ({
				headerShown: false
			})}
		>
			<Stack.Screen name='Sell' component={Sell} />
			<Stack.Screen name='LocationSection' component={LocationSection} />
		</Stack.Navigator>
	)
}

const Tab = () => {
	const [user] = useContext(UserContext)
	const [theme] = useContext(ThemeContext);
	const Tab = createBottomTabNavigator();

	var render = (Element) => user.verified ? Element: VerifyStack 

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveBackgroundColor: theme === "dark" ? "black" : "white",
				tabBarInactiveBackgroundColor: theme === "dark" ? "#333333" : "white",
				tabBarActiveTintColor: theme === "dark" ? "white" : "black",
				tabBarStyle: {
					borderTopWidth: 0
				}
			})}>
			<Tab.Screen
				name='Home'
				component={HomeStack}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <FontAwesome5
						name='home'
						color={color}
						size={size} />
				}}
			/>
			<Tab.Screen
				name='Chats'
				component={user._id ? render(ChatStack) : Login}
				options={{
					tabBarLabel: 'Chat',
					tabBarIcon: ({ color, size }) => <FontAwesome5
						name='envelope'
						color={color}
						size={size} />,
					tabBarVisibilityAnimationConfig: {
						show: {
							animation: 'spring',
							config: {
								bounciness: 45,
								delay: 1000
							}
						}
					}
				}}
			/>
			<Tab.Screen
				name='SellStack'
				component={user._id ? render(SellStack) : Login}
				options={{
					tabBarLabel: 'Sell',
					tabBarIcon: ({ color, size }) => <FontAwesome5
						name='plus'
						color={color}
						size={size} />
				}}
			/>
			<Tab.Screen name='User' component={user._id ? render(ProfileStack) : Login}
				options={{
					tabBarLabel: 'User',
					tabBarIcon: ({ color, size }) => <FontAwesome5
						name='user'
						color={color}
						size={size} />
				}} />
		</Tab.Navigator>
	)
}

const Stack = () => {
	const Stack = createNativeStackNavigator();
	return <Stack.Navigator
		screenOptions={{
			headerShown: false
		}}
	>
		<Stack.Screen name='Tab' component={Tab} />
		<Stack.Screen name="Details" component={ProductDetails} />
		<Stack.Screen name="ProductBids" component={ProductBids} />
		<Stack.Screen name="LocationSection" component={SearchSection} />
		<Stack.Screen name="Filters" component={Filters} />
		<Stack.Screen options={() => ({
			headerShown: true
		})} name="Chat" component={Chat} />
	</Stack.Navigator>
}

export default Stack;