import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BidItem = ({item}) => {
  return (
    <View style={styles.main}>
      <Text>{JSON.stringify(item)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BidItem
