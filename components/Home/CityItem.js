import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CityItem = ({city}) => {
  return (
    <View>
      <Text>{city.city}</Text>
    </View>
  )
}

export default CityItem

const styles = StyleSheet.create({})