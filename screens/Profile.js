import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { UserContext } from '../global/UserContext';

const Profile = () => {
	const [user, setUser] = useContext(UserContext);
	const handleLogout = async() => {
		await AsyncStorage.removeItem("fyptoken");
		setUser({});
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity>
				{user?.image?.url ?
					<Avatar.Image size={200} source={{ uri: user.image.url }} />
					: <Avatar.Text label={user?.name[0]} />}
			</TouchableOpacity>
			<Text style={styles.userName}>{user?.name}</Text>
			<TouchableOpacity onPress={handleLogout}>
				<View>
					<Text>Logout</Text>
				</View>
			</TouchableOpacity>
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
	}
})

export default Profile;
