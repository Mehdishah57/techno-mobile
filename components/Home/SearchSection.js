import { View, StyleSheet, Text } from 'react-native'
import React, { useState, useContext } from 'react'
import { TextInput, TouchableRipple } from 'react-native-paper';
import { SearchContext } from '../../global/SearchContext';

const SearchSection = () => {
	const [text, setText] = useState("");
	const [, setSearch] = useContext(SearchContext);

	const handlePress = () => setSearch(text);

	return (
		<View style={styles.main}>
			<TextInput 
				value={text}
				label="Search"
				mode="outlined"
				onChangeText={text => setText(text)}
			/>
			<TouchableRipple onPress={handlePress}>
				<View>
					<Text>Search</Text>				
				</View>
			</TouchableRipple>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		width: '100%',
		height: '100%',
		padding: 10
	}
})

export default SearchSection;