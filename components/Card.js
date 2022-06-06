import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { UserContext } from "../global/UserContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import addToFav from '../services/addToFav';
import removeFromFav from '../services/removeFromFav';
import { ThemeContext } from '../global/ThemeContext';


const ProductItem = ({ item, onPress }) => {
  const [user, setUser] = useContext(UserContext);
  const [theme] = useContext(ThemeContext);

  const navigation = useNavigation();

  const handleAdd = async() => {
    const temp = [...user.favourites];
    temp.push(item._id);
    setUser({...user, favourites:temp});
    const [, error] = await addToFav(item._id);
    if(!error) return;
    const favs = user.favourites.filter(id => id !== item._id);
    setUser({...user, favourites:favs});
  }

  const handleRemove = async() => {
    const temp = user.favourites.filter(id => id !== item._id);
    setUser({...user, favourites:temp});
    const [, error] = await removeFromFav(item._id)
    if(!error) return;
    const favs = [...user.favourites];
    favs.push(item._id);
    setUser({...user, favourites:favs});
  }

  const Heart = () => {
    if (!user._id) return (
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <FontAwesome5 name='heart' color='gray' size={18} />
      </TouchableOpacity>)
    const favourite = user.favourites.find(itm => itm === item._id);
    if(!favourite) return(
      <TouchableOpacity onPress={handleAdd}>
        <AntDesignIcons	name='hearto' color='red' size={20} />
      </TouchableOpacity>
    )
    return (
      <TouchableOpacity onPress={handleRemove}>
        <AntDesignIcons name='heart' color='red' size={18} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, backgroundStyles[theme]]}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{ uri: item.picture.image1.url }} />
        <Text style={[styles.text, textStyles[theme]]}>{item.title.slice(0,22)}</Text>
        <Text style={styles.price}>RS {item.price}</Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <Text style={styles.date}>{new Date(item.createdAt).getDay() + "/" + new Date(item.createdAt).getMonth() + "/" + new Date(item.createdAt).getFullYear() + " in " + item.location.city}</Text>
        <Heart />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: 290,
    borderRadius: 10,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },
  text: {
    fontSize: 12,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 12,
    paddingLeft: 10
  },
  image: {
    width: '100%',
    height: 200
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  date: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 10,
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


export default ProductItem;