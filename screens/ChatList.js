import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react';
import useMessageList from "../hooks/useMessageList";
import ListItem from '../components/Messages/ListItem';
import { ThemeContext } from '../global/ThemeContext';
import Loader from '../components/Loader';

const ChatList = () => {
	const [list, error, loading] = useMessageList();
	const [theme] = useContext(ThemeContext);

	if(loading) return <Loader />
	return (
		<ScrollView style={[styles.container, backgroundStyles[theme]]}>
			{list.map( item => <ListItem key={item._id} item={item} /> )}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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

export default ChatList
