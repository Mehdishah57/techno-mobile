import { StyleSheet, View, FlatList } from 'react-native'
import React, {useState, useRef, useEffect, useContext} from 'react'
import { ThemeContext } from '../../global/ThemeContext';
import getCategories from '../../services/getCategories';
import { useNavigation } from '@react-navigation/native';
import CategoryBox from '../Home/CategoryBox';
import ErrorText from '../ErrorText';

const CategorySection = ({
  categoryTouched, 
  categoryError, 
  subCategoryTouched, 
  subCategoryError,
  setFieldValue
}) => {
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

  const handlePress = item => setFieldValue("category",item.name);

  return (
    <View style={[styles.container,backgroundStyles[theme]]}>
      <FlatList 
        data={categories}
        numColumns={4}
        renderItem={({item})=><CategoryBox 
          onPress={()=>handlePress(item)} 
          item={item}
        />}
      />
      <ErrorText touched={categoryTouched} error={categoryError} />
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
