import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ThemeContext } from '../../global/ThemeContext';
import { CityContext } from '../../global/CityContext';

const CitySelect = ({ navigation }) => {
	const [city] = useContext(CityContext);
	const [theme] = useContext(ThemeContext);

	return (
		<TouchableOpacity onPress={() => navigation.navigate("Cities")}>
			<View style={[styles.citySelect, backgroundStyles[theme]]}>
				<View style={styles.container}>
					<FontAwesome5 name="location-arrow" color={textStyles[theme].color} size={20} />
					<Text style={[styles.text, textStyles[theme]]}>{city.name || "Pakistan"}</Text>
				</View>
				<FontAwesome5 name="chevron-down" color={textStyles[theme].color} size={20} />
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	citySelect: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		borderRadius: 20
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
	text: {
		marginLeft: 10,
		fontWeight: 'bold'
	}
})

const backgroundStyles = StyleSheet.create({
	dark: { backgroundColor: '#333333' },
	light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
	dark: { color: 'white' },
	light: { color: 'black' }
})

export default React.memo(CitySelect);