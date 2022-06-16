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
import { ThemeContext } from '../../global/ThemeContext';

const ListItem = ({ item }) => {
  const [user] = useContext(UserContext);
  const [theme] = useContext(ThemeContext);

  const navigation = useNavigation();

  let other = user._id === item.idOne._id.toString() ? item.idTwo : item.idOne;

  return (
    <TouchBox style={[]} onPress={() => navigation.navigate("Chat", {id: item._id})}>
      <View style={[styles.container,backgroundStyles[theme]]}>
        <Image style={styles.avatar} source={{ uri: other.image?.url }} />
        <View style={styles.message}>
          <Text style={textStyles[theme]}>{other.name}</Text>
          <Text style={[textStyles[theme],theme==="light"?{color:'gray'}:{}]}>{item.messages[0]?.message?.slice(0,10)}</Text>
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
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: '#333333' },
  light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
  dark: { color: 'white' },
  light: { color: 'black' }
})


export default ListItem
