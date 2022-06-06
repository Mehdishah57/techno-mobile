import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableRipple } from 'react-native-paper';
import { ThemeContext } from '../../global/ThemeContext';

const CityItem = ({ city, onPress }) => {
  const [theme] = useContext(ThemeContext);
  return (
    <TouchableRipple style={backgroundStyles[theme]} rippleColor='#707070' onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.subContainer]}>
          <Ionicons name='location-outline' size={20} color={textStyles[theme].color} />
          <Text style={textStyles[theme]}>{city.city || "All Pakistan"}</Text>
        </View>
        <Ionicons name='chevron-forward' size={20} color={textStyles[theme].color} />
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row'
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

export default CityItem
