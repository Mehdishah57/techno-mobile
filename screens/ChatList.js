import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react';
import useMessageList from "../hooks/useMessageList";
import ListItem from '../components/Messages/ListItem';

const ChatList = () => {
	const [list, error, loading] = useMessageList();

	return (
		<ScrollView style={styles.container}>
			{loading? 
				<ActivityIndicator size={60} color="black" />
			:list.map( item => <ListItem key={item._id} item={item} /> )}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'white'
	}
})

export default ChatList
