import * as React from 'react';
import { TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const ProductItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Card>
      <Card.Cover source={{ uri: item.picture.image1.url }} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.location.city + " " + item.location.province}</Paragraph>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

export default ProductItem;