import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';

const ProductItem = ({ item, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Card style={{padding:10}}>
        <Card.Cover source={{ uri: item.picture.image1.url }} />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.price}>RS {item.price}</Text>
        {/* <Card.Content>
          <Title style={styles.text}>{item.title}</Title>
          <Paragraph>{item.location.city + " " + item.location.province}</Paragraph>
        </Card.Content> */}
      </Card>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 180,
    borderRadius:10,
  },
  text:{
    fontSize:12,
    color:'black'
  },
  price: {
    color:'green',
    fontWeight:'bold',
    fontSize:12
  }
})

export default ProductItem;