import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import getIconName from '../../utils/getIconName';

const CategoryBox = ({ item, onPress }) => {
	const {iconName, color} = getIconName(item.name);
	return (
		<TouchableOpacity onPress={onPress} style={styles.touch}>
			<View style={[{backgroundColor:color},styles.container]}>
				<FontAwesome5 name={iconName} size={20} color='black' />
			</View>
			<Text style={styles.name}>{item.name}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	touch: {
		display:'flex',
		justifyContent:'space-between',
		alignItems:'center',
		maxWidth: 80,
		margin:10
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		width: 60,
		borderRadius: 80,
	},
	name: {
		fontWeight: 'bold',
		textAlign: 'center',
		color:'gray'
	}
})

export default CategoryBox
