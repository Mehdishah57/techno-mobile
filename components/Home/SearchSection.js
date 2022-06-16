import { View, StyleSheet, Text } from 'react-native'
import React, { useState, useContext, useMemo } from 'react'
import { TextInput, TouchableRipple } from 'react-native-paper';
import { SearchContext } from '../../global/SearchContext';
import { ThemeContext } from '../../global/ThemeContext';

const SearchSection = ({navigation}) => {
	const [text, setText] = useState("");
	const [, setSearch] = useContext(SearchContext);
	const [theme] = useContext(ThemeContext);

	const handlePress = () => {
		setSearch(text);
		navigation.navigate("SearchHome");
	}

	const fieldTheme = useMemo(() => ({
		colors: {
			text: textStyles[theme].color,
			placeholder: textStyles[theme].color,
			primary: textStyles[theme].color,
      		background: backgroundStyles[theme].backgroundColor
		}
	}), [theme])

	return (
		<View style={[styles.main, backgroundStyles[theme]]}>
			<TextInput 
				value={text}
				label="Search"
				mode="outlined"
				onChangeText={text => setText(text)}
				theme={fieldTheme}
			/>
			<TouchableRipple style={styles.searchBtn} onPress={handlePress}>
				<Text style={styles.text}>Search</Text>				
			</TouchableRipple>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		width: '100%',
		height: '100%',
		padding: 10
	},
	 searchBtn: {
		padding: 10,
		backgroundColor: 'dodgerblue',
		borderRadius: 10,
		marginTop: 10
	 },
	 text: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18
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

export default SearchSection;