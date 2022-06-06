import { StyleSheet, View, FlatList } from 'react-native'
import React, { useState, useRef, useEffect, useContext, useMemo } from 'react'
import getLocationData from "../../services/getLocationData";
import CityItem from './CityItem';
import { TextInput } from 'react-native-paper';
import { ThemeContext } from '../../global/ThemeContext';
import { CityContext } from '../../global/CityContext';

const CityList = ({ navigation }) => {
	const [cities, setCities] = useState([]);
	const [citiesMap, setCitiesMap] = useState([]);
	const [loading, setLoading] = useState(true);
	const [text, setText] = useState("");
	const cityContext = useContext(CityContext);
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

	const handlePress = (city) => {
		cityContext[1]({_id: city._id, name: city.city});
		navigation.goBack();
	}

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
			<View style={styles.container}>
			<CityItem city={{city:undefined}} onPress={()=>handlePress({_id:undefined})}  />
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

export default CityList
