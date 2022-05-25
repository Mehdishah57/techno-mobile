import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ProductItem = ({ item, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.image} source={{ uri: item.picture.image1.url }} />
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
    <View style={styles.bottom}>
        <Text style={styles.price}>RS {item.price}</Text>
        <TouchableOpacity>
          <FontAwesome5 name='heart' color='red' size={20} />
        </TouchableOpacity>
      </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '40%',
    borderRadius: 10,
    padding: 10
  },
  text: {
    fontSize: 16,
    color: 'black'
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14
  },
  image: {
    width: '100%',
    height: 200
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default ProductItem;