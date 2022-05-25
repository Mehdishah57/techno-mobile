import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useContext} from 'react'
import SubCategoryItem from '../components/Home/SubCategoryItem';
import { FilterContext } from '../global/FilterContext';

const SubCategoryList = ({ route, navigation }) => {
	const [filters, setFilters] = useContext(FilterContext)
	const { item } = route.params;

	const handlePress = (subCategory) => {
		setFilters({...filters, mainCategory: item.name, subCategory })
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={item.subCategories}
				renderItem={({ item }) => <SubCategoryItem item={item} onPress={()=>handlePress(item)} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		backgroundColor:'white',
		height:'100%'
	}
})

export default SubCategoryList
