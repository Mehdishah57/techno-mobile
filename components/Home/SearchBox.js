import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react';
import Icons from "react-native-vector-icons/AntDesign";
import { ThemeContext } from '../../global/ThemeContext';

const SearchBox = ({ navigation }) => {
  const [theme] = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={() => navigation.navigate("LocationSection")}>
      <View style={[backgroundStyles[theme], styles.main]}>
        <Text style={[textStyles[theme], styles.text]}>Search</Text>
        <Icons name="search1" size={25} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10
  },
  text: {
    fontWeight: 'bold'
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

export default SearchBox