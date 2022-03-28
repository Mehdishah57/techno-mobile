import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const ProductItem = ({item}) => (
  <Card>
    <Card.Cover source={{ uri: item.picture.image1.url }} />
    <Card.Content>
      <Title>{item.title}</Title>
      <Paragraph>{item.location.city + item.location.province}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default ProductItem;