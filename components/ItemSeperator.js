import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemSeperator = () => {
  return (
    <View style={styles.seperator}>
    </View>
  )
}

const styles = StyleSheet.create({
    seperator: {
        width:'100%',
        backgroundColor:'black',
        height: 1
    }
})

export default ItemSeperator
