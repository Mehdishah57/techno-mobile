import { StyleSheet, Text, ScrollView } from 'react-native'
import React, {useState, useRef, useEffect, useContext} from 'react'
import getLocationData from "../../services/getLocationData";
import CityItem from './CityItem';

const CityList = ({navigation}) => {
	const [cities, setCities] = useState([]);
	const fetchData = useRef(null);

	fetchData.current = async () => {
		const [data, error] = await getLocationData();
		if (!error) setCities(data);
	}

	useEffect(() => {
		fetchData.current();
	}, [])

	const handlePress = (city) => {}

	return (
		<ScrollView style={styles.container}>
			{cities.map(city => <CityItem city={city} onPress={()=>handlePress(city)}/>)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',height:'100%',
		backgroundColor:'white'
	}
})

export default CityList
