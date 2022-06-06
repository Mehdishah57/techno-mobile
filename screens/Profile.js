import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../global/UserContext';
import socket from '../socket/socket';
import ItemSeperator from '../components/ItemSeperator';
import UserImage from '../components/Profile/UserImage';
import { ThemeContext } from '../global/ThemeContext';
import ProfileItem from '../components/Profile/ProfileItem';

const Profile = () => {
	const [user, setUser] = useContext(UserContext);
	const [theme] = useContext(ThemeContext);
	const [image, setImage] = useState("");
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation();

	const handleLogout = async () => {
		await AsyncStorage.removeItem("fyptoken");
		setUser({});
		socket.disconnect();
	}

	return (
		<View style={[styles.container,backgroundStyles[theme]]}>
			<UserImage />
			<Text style={[styles.userName, textStyles[theme]]}>{user?.name}</Text>
			<View style={styles.menu}>
				<ItemSeperator />
				<ProfileItem 
					onPress={() => navigation.navigate("Favourites")}
					title="Favourites"
					icon="heart"
				/>
				<ItemSeperator />
				<ProfileItem 
					onPress={() => navigation.navigate("MyAds")}
					title="My Ads"
					icon="user"
				/>
				<ItemSeperator />
				<ProfileItem 
					onPress={() => navigation.navigate("ChangePhone")}
					title="Change Phone Number"
					icon="phone"
				/>
				<ItemSeperator />
				<ProfileItem 
					onPress={handleLogout}
					title="Logout"
					icon="sign-out-alt"
				/>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: 'center',
		alignItems: 'center',
	},
	userName: {
		fontWeight: 'bold',
		fontSize: 18,
		margin: 10
	},
	menu: {
		display: 'flex',
		margin: 10,
		width: '100%',
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		padding: 20,
		marginBottom: 10
	},
	text: {
		fontWeight: 'bold',
	},
	favs: {
		color: 'red'
	}
})

const backgroundStyles = StyleSheet.create({
	dark: { backgroundColor: 'black' },
	light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
	dark: { color: 'white' },
	light: { color: 'black' }
})


export default Profile;
