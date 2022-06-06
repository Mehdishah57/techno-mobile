import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'

const MyAds = () => {
  const [theme] = useContext(ThemeContext)
  return (
    <View style={[styles.container, backgroundStyles[theme]]}>
      <Text>MyAds</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default MyAds
