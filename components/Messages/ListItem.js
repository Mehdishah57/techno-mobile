import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import React, { useState, useRef, useContext, useEffect } from 'react'
import { UserContext } from '../../global/UserContext';
import TouchBox from "../TouchBox";
import { useNavigation } from '@react-navigation/native';

const ListItem = ({ item }) => {
  const [user] = useContext(UserContext);

  const navigation = useNavigation();

  let other = user._id === item.idOne._id.toString() ? item.idTwo : item.idOne;

  return (
    <TouchBox onPress={() => navigation.navigate("Chat", {id: item._id})}>
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: other.image?.url }} />
        <View style={styles.message}>
          <Text style={styles.name}>{other.name}</Text>
          <Text style={styles.text}>{item.messages[0]?.message?.slice(0,10)}</Text>
        </View>
      </View>
    </TouchBox>

  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60
  },
  message: {
    display: 'flex',
    marginLeft: 10
  },
  name: {
    color: 'black',
  },
  text: {
    color: 'gray',
  }
})

export default ListItem
