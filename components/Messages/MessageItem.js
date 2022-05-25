import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../global/UserContext'

const MessageItem = ({ message, chat, index }) => {
	const [user] = useContext(UserContext);

	let otherUser = chat.idOne._id.toString() === user._id ? chat.idTwo : chat.idOne;

	return (
		<View style={styles.container}>
			{user._id === message.by ? <View style={styles.subContainerMy}>
				{index > 0 && chat.messages[index-1].by !== message.by ? <Image
					source={{ uri: user._id === message.by ? user.image?.url : otherUser.image?.url }}
					style={styles.image}
				/>: null}
				<Text style={styles.my}>
					{message.message}
				</Text>
			</View> : <View style={styles.subContainerHis}>
				<Text style={styles.his}>
					{message.message}
				</Text>
				{index > 0 && chat.messages[index-1].by !== otherUser._id ? <Image
					source={{ uri: user._id === message.by ? user.image?.url : otherUser.image?.url }}
					style={styles.image}
				/>:null}
			</View>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		backgroundColor: 'white'
	},
	subContainerMy: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row'
	},
	subContainerHis: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	my: {
		display: 'flex',
		alignSelf: 'flex-start',
		backgroundColor: 'rgb(19, 89, 180)',
		color: 'white',
		padding: 5,
		borderRadius: 10,
		margin: 10,
		fontSize: 16
	},
	his: {
		display: 'flex',
		alignSelf: 'flex-end',
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
		color: 'black',
		margin: 10,
		fontSize: 16,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50
	}
})

export default MessageItem
