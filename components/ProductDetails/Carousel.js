import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, useWindowDimensions } from 'react-native'

const Carousel = ({images}) => {
    const { width } = useWindowDimensions();
  return (
    <View>
      <FlatList 
        data={Object.values(images)}
        renderItem={({item}) => <Image style={[styles.image,{width}]} source={{uri: item.url}}/>}
        keyExtractor={(itm,index) => index.toString()}
        horizontal
      />
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        height:300
    }
})

export default Carousel
