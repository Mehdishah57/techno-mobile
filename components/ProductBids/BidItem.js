import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../global/ThemeContext'
import { TouchableRipple } from 'react-native-paper'

const BidItem = ({ item }) => {
  const [theme] = useContext(ThemeContext);
  return (
    <TouchableRipple onPress={()=>{}} style={[styles.main, backgroundStyles[theme]]}>
      <React.Fragment>
        <Text style={[styles.name, textStyles[theme]]}>{item.by?.name}</Text>
        <Text style={styles.price}>RS: {item.price}</Text>
        <Text style={[styles.date, textStyles[theme]]}>{
          new Date(item.at).toLocaleDateString()
        }</Text>
      </React.Fragment>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20
  },
  price: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold"
  },
  date: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20
  },
  name: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 20
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: '#333333' },
  light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
  dark: { color: 'gray' },
  light: { color: 'black' }
})


export default BidItem
