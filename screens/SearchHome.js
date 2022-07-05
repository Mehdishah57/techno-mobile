import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext } from 'react';
import { SearchContext } from '../global/SearchContext';
import { CityContext } from '../global/CityContext';
import { MainCategoryContext } from '../global/MainCategoryContext';
import { SubCategoryContext } from '../global/SubCategoryContext';
import { ThemeContext } from '../global/ThemeContext';
import Search from '../components/SearchHome/Search';
import CitySelect from '../components/Home/CitySelect';
import ProductList from '../components/SearchHome/ProductList';

const SearchHome = ({navigation}) => {
  const [search, setSearch] = useContext(SearchContext);
  const [city, setCity] = useContext(CityContext);
  const [mainCategory, setMainCategory] = useContext(MainCategoryContext);
  const [subCategory, setSubCategory] = useContext(SubCategoryContext);
  const [theme] = useContext(ThemeContext);

  return (
    <View style={[styles.main, backgroundStyles[theme]]}>
      <CitySelect navigation={navigation} />
      <Search search={search} setSearch={setSearch} />
      <ProductList navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingBottom: 40,
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


export default SearchHome;