import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect, useRef, useContext} from 'react';
import getCategories from "../../services/getCategories";
import CategoryBox from './CategoryBox';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../global/ThemeContext';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [theme] = useContext(ThemeContext);
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

  return (
    <View style={[styles.container,backgroundStyles[theme]]}>
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
    padding: 10,
    marginTop: 10
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: 'black' },
  light: { backgroundColor: 'white' }
})

export default React.memo(CategoryList);
