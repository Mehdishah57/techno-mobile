import { StyleSheet, Text, View, FlatList, useWindowDimensions } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { ThemeContext } from '../global/ThemeContext';
import { UserContext } from '../global/UserContext';
import Icon from "react-native-vector-icons/MaterialIcons"
import getFavourites from '../services/getFavourites';
import Loader from '../components/Loader';
import ProductItem from "../components/Card";

const Favourites = ({navigation}) => {
  const [favs, setFavs] = useState([]);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme] = useContext(ThemeContext);
  const [user] = useContext(UserContext);
  const [numColumns, setNumColumns] = useState(2);
  const fetchFavs = useRef(null);
  const dimensions = useWindowDimensions();

  fetchFavs.current = async() => {
    const [data] = await getFavourites(user.favourites);
    setFavs(data);
    setLoading(false);
  }

  useEffect(()=>{
    fetchFavs.current()
  },[])

  useEffect(()=>{
    console.log(dimensions.width)
    console.log('cols should be '+ parseInt(dimensions.width/220))
    if(parseInt(dimensions.width/220) === numColumns) return;
    setNumColumns(parseInt(dimensions.width/220))
    setKey((dimensions.width/220).toString())
  },[dimensions.width])

  if(loading) return <Loader />
  return (
    <View style={[styles.main, backgroundStyles[theme]]}>
      <Text style={[styles.header, textStyles[theme]]}>Favourites <Icon name='favorite' size={20} color={"red"} /></Text>
      <FlatList 
        key={key}
        data={favs}
        renderItem={({item}) => <ProductItem 
          onPress={()=>navigation.navigate("Details", { _id: item._id })} 
          item={item} 
        />}
        collapsable
        numColumns={numColumns}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: 'black' },
  light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
  dark: { color: 'white' },
  light: { color: 'black' }
})

export default Favourites
