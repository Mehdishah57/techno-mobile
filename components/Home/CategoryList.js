import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect, useRef, useContext} from 'react';
import getCategories from "../../services/getCategories";
import CategoryBox from './CategoryBox';
import { useNavigation } from '@react-navigation/native';
import { FilterContext } from '../../global/FilterContext';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useContext(FilterContext)
	const fetchData = useRef(null);

  const navigation = useNavigation();

	fetchData.current = async () => {
		const [data, error] = await getCategories();
		if (!error) setCategories(data);
	}

	useEffect(() => {
		fetchData.current();
	}, [])

  const handlePress = (item) => navigation.navigate("SubCategory",{item});

  const removeCategoryFilter = () => {
    if(filters.mainCategory)
      setFilters({...filters, mainCategory:undefined,subCategory:undefined})
  }

  return (
    <View style={styles.container}>
      <CategoryBox item={{name: "All Categories"}} onPress={removeCategoryFilter} />
      <FlatList 
        data={categories}
        renderItem={({item})=><CategoryBox 
          onPress={()=>handlePress(item)} 
          item={item}
        />}
        horizontal
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    width: '100%',
    flexDirection:'row',
    padding: 10
  }
})

export default CategoryList
