import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { TouchableRipple } from 'react-native-paper'
import { ThemeContext } from '../../global/ThemeContext'

const SubCategoryBox = ({item, onPress}) => {
    const [theme] = useContext(ThemeContext);
  return (
    <TouchableRipple style={[styles.ripple, borderStyles[theme]]} onPress={onPress}>
      <Text style={[textStyles[theme]]}>{item}</Text>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
    ripple:{
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5
    }
})

const borderStyles = StyleSheet.create({
    dark: { borderColor: 'white' },
    light: { borderColor: 'black' }
})

const textStyles = StyleSheet.create({
    dark: { color: 'white' },
    light: { color: 'black' }
  })

export default SubCategoryBox;
