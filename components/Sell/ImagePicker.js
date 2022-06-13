import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../global/ThemeContext'
import Icons from "react-native-vector-icons/AntDesign"

const ImagePicker = ({onPress, uri, name}) => {
  const [theme] = useContext(ThemeContext);
  return (
    <TouchableOpacity style={[styles.container,borderStyles[theme]]} onPress={()=>onPress(name)}>
      {uri? 
        <Image style={styles.image} source={{uri}}/>
      : <Icons name='plus' size={50} color={textStyles[theme].color} />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    width: 150,
    height: 150,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20
  }
})

const textStyles = StyleSheet.create({
  dark: { color: 'white' },
  light: { color: 'black' }
})

const borderStyles = StyleSheet.create({
  dark: { borderColor: 'white' },
  light: { borderColor: 'black' }
})

export default ImagePicker;