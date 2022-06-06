import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useContext} from 'react'
import SubCategoryItem from '../components/Home/SubCategoryItem';
import { ThemeContext } from '../global/ThemeContext';
import { MainCategoryContext } from '../global/MainCategoryContext';
import { SubCategoryContext } from '../global/SubCategoryContext';

const SubCategoryList = ({ route, navigation }) => {
	const [, setMainCategory] = useContext(MainCategoryContext);
	const [, setSubCategory] = useContext(SubCategoryContext);
	const [theme] = useContext(ThemeContext);
	const { item } = route.params;

	const handlePress = (subCategory) => {
		setMainCategory(item.name);
		setSubCategory(subCategory);
		navigation.navigate("SearchHome");
	}

	return (
		<View style={[styles.container,backgroundStyles[theme]]}>
			<FlatList
				data={item.subCategories}
				renderItem={({ item }) => <SubCategoryItem 
					item={item} 
					onPress={()=>handlePress(item)} 
				/>}
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

const backgroundStyles = StyleSheet.create({
	dark: { backgroundColor: 'black' },
  light: { backgroundColor: 'white' }
})
  
export default SubCategoryList
