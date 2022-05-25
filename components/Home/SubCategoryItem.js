import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import TouchBox from '../TouchBox';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SubCategoryItem = ({item, onPress}) => {
  return (
    <TouchBox onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{item}</Text>
        <FontAwesome5 name='angle-right' size={20} />
      </View>
    </TouchBox>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height: 80,
    padding: 10
  },
  text: {
    textAlign:'left',
    color:'gray'
  }
})

export default SubCategoryItem;
