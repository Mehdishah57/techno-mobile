import { StyleSheet, View, FlatList } from 'react-native'
import React, {useState, useRef, useEffect, useContext} from 'react'
import { ThemeContext } from '../../global/ThemeContext';
import getCategories from '../../services/getCategories';
import { useNavigation } from '@react-navigation/native';
import CategoryBox from '../Home/CategoryBox';
import ErrorText from '../ErrorText';
import DropDown from '../DropDown';
import { TouchableRipple } from 'react-native-paper';
import SubCategoryBox from './SubCategoryBox';

const CategorySection = ({
  categoryTouched, 
  categoryError, 
  subCategoryTouched, 
  subCategoryError,
  setFieldValue,
}) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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

  const handlePress = item => {
    setFieldValue("category",item.name);
    setSubCategories(item.subCategories);
  }

  const handleSubCategoryPress = item => setFieldValue("subCategory", item);

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
      <FlatList 
        data={subCategories}
        renderItem={({item})=><SubCategoryBox item={item} onPress={()=>handleSubCategoryPress(item)} />}
        horizontal
      />
      <ErrorText 
        touched={categoryTouched||subCategoryTouched} 
        error={categoryError||subCategoryError} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    width: '100%',
    padding: 10,
    marginTop: 10
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

export default CategorySection
