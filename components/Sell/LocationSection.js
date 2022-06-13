import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect, useRef, useContext, useMemo } from 'react'
import { ThemeContext } from '../../global/ThemeContext';
import { TextInput } from 'react-native-paper';
import CityItem from '../Home/CityItem';
import getLocationData from '../../services/getLocationData';

const LocationSection = ({navigation}) => {
  const [cities, setCities] = useState([]);
	const [citiesMap, setCitiesMap] = useState([]);
	const [loading, setLoading] = useState(true);
	const [text, setText] = useState("");
	const [theme] = useContext(ThemeContext);
	const fetchData = useRef(null);

	fetchData.current = async () => {
		setLoading(true);
		const [data, error] = await getLocationData();
		if (error) return; 
		setCities(data);
		setCitiesMap(data);
		setLoading(false);
	}

	useEffect(() => {
		fetchData.current();
	}, [])

	const handlePress = (city) => 
		navigation.navigate("Sell", { cityName: city.city, cityId: city._id });

	const handleChange = text => {
		if(!text) {
			setText(text);
			setCitiesMap(cities);
		}
		const temp = cities.filter(city => city.city.indexOf(text) !== -1);
		setCitiesMap(temp);
		setText(text);
	}

	const inputTheme = useMemo(()=>({colors: {text: textStyles[theme].color, 
		background: backgroundStyles[theme].color ,
		placeholder:textStyles[theme].color,
		primary:textStyles[theme].color}}),[theme])

	return (
		<View style={[styles.view, backgroundStyles[theme]]}>
			<View style={styles.input}>
				<TextInput
					label="Search"
					mode='outlined'
					value={text}
					onChangeText={handleChange}
					theme={inputTheme}
				/>
			</View>
			<FlatList 
				style={styles.container}
				data={citiesMap}
				renderItem={({item})=><CityItem city={item} onPress={()=>handlePress(item)}  />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height:'100%'
	},
	container: {
		padding: 10,
	},
	input: {
		margin:10
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

export default LocationSection
