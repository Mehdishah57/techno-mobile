import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TouchBox from '../TouchBox';
import { FilterContext } from '../../global/FilterContext';

const CitySelect = ({navigation}) => {
    const [filters] = useContext(FilterContext);
    
    return (
        <TouchBox onPress={() => navigation.navigate("Cities")}>
            <View style={styles.citySelect}>
                <View style={styles.container}>
                    <FontAwesome5 name="location-arrow" size={20} />
                    <Text style={styles.text}>{filters.city || "Location"}</Text>
                </View>
                <FontAwesome5 name="chevron-down" size={20} />
            </View>
        </TouchBox>
    )
}

const styles = StyleSheet.create({
    citySelect: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems: 'center',
		padding: 10
	},
    container: {
        display:'flex',
        flexDirection:'row'
    },
    text: {
        marginLeft: 10,
        color:'gray'
    }
})

export default CitySelect;