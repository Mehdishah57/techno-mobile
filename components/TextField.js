import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'

const TextField = ({ placeholder, inputStyle, value, onChangeText }) => {
    const [theme] = useContext(ThemeContext);
  return (
      <TextInput 
        placeholder={placeholder}
        style={[styles.input,textStyles[theme], backgroundStyles[theme],inputStyle]}
        value={value}
        onChangeText={onChangeText}
      />
  )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 100
    }
})

const backgroundStyles = StyleSheet.create({
	dark: { backgroundColor: 'black' },
	light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
	dark: { color: 'gray' },
	light: { color: 'black' }
})

export default TextField
