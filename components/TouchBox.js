import { StyleSheet, Text, View, Platform, TouchableOpacity , TouchableNativeFeedback } from 'react-native'
import React from 'react'

const TouchBox = ({children, onPress, style}) => {
    const Box = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
  return (
    <Box style={style} onPress={onPress}>
      {children}
    </Box>
  )
}

const styles = StyleSheet.create({})

export default TouchBox
