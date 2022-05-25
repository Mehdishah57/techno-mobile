import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { UserContext } from '../global/UserContext';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import socket from '../socket/socket';

const Profile = () => {
	const [user, setUser] = useContext(UserContext);

	const navigation = useNavigation();

	const handleLogout = async () => {
		await AsyncStorage.removeItem("fyptoken");
		setUser({});
		socket.disconnect();
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity>
				{user?.image?.url ?
					<Avatar.Image size={200} source={{ uri: user?.image?.url }} />
					: <Avatar.Text label={user?.name[0]} />}
			</TouchableOpacity>
			<Text style={styles.userName}>{user?.name}</Text>
			<View style={styles.menu}>
				<TouchableOpacity onPress={()=>navigation.navigate("Favourites")}>
					<View style={styles.item}>
						<Text style={styles.text}>
							<FontAwesome5 name='heart' size={20} /> Favourites
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>navigation.navigate("MyAds")}>
					<View style={styles.item}>
						<Text style={styles.text}>
							<FontAwesome5 name='user' size={20} /> My Ads
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>navigation.navigate("ChangePhone")}>
					<View style={styles.item}>
						<Text style={styles.text}>
							<FontAwesome5 name='phone' size={20} /> Change Phone Number
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleLogout}>
					<View style={styles.item}>
						<Text style={styles.text}>
							<FontAwesome5 name='sign-out-alt' size={20} /> Logout
						</Text>
					</View>
				</TouchableOpacity>
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
		backgroundColor: 'white'
	},
	userName: {
		fontWeight: 'bold',
		fontSize: 18,
		margin: 10,
		color: 'black'
	},
	menu: {
		display: 'flex',
		margin: 10,
		width: '100%',
		padding: 10
	},
	item: {
		display:'flex',
		justifyContent:'center',
		alignItems:'flex-start',
		width: '100%',
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 10,
		backgroundColor: 'black',
		padding: 10,
		marginBottom:10
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
	}
})

export default Profile;
