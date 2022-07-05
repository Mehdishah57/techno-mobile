import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext } from 'react';
import { SearchContext } from '../global/SearchContext';
import { CityContext } from '../global/CityContext';
import { MainCategoryContext } from '../global/MainCategoryContext';
import { SubCategoryContext } from '../global/SubCategoryContext';

const SearchHome = ({navigation}) => {
  const [search, setSearch] = useContext(SearchContext);
  const [city, setCity] = useContext(CityContext);
  const [mainCategory, setMainCategory] = useContext(MainCategoryContext);
  const [subCategory, setSubCategory] = useContext(SubCategoryContext);

  return (
    <View style={styles.main}>
      <Text>SearchHome</Text>
      <Text>Search Bar</Text>
      <Text>Location</Text>
      <Text>Filters</Text>
      <Text>Product List</Text>
      <ScrollView></ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})

export default SearchHome;