import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { ThemeContext } from '../global/ThemeContext';
import { UserContext } from '../global/UserContext';
import Icon from "react-native-vector-icons/MaterialIcons"
import getFavourites from '../services/getFavourites';
import Loader from '../components/Loader';
import ProductItem from "../components/Card";
import { ScrollView } from 'react-native-gesture-handler';

const Favourites = ({navigation}) => {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useContext(ThemeContext);
  const [user] = useContext(UserContext);
  const fetchFavs = useRef(null);

  fetchFavs.current = async() => {
    const [data] = await getFavourites(user.favourites);
    setFavs(data);
    setLoading(false);
  }

  useEffect(()=>{
    fetchFavs.current()
  },[])

  if(loading) return <Loader />
  return (
    <View style={[styles.main, backgroundStyles[theme]]}>
      <Text style={[styles.header, textStyles[theme]]}>Favourites <Icon name='favorite' size={20} color={"red"} /></Text>
      <ScrollView style={styles.wrapper} contentContainerStyle={styles.wrapperContainer}>
      {favs.map(item => <ProductItem 
          onPress={()=>navigation.navigate("Details", { _id: item._id })} 
          item={item} 
        />)}
      </ScrollView>
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
  },
  wrapper: {
    display: 'flex',
    
    width: '100%'
  },
  wrapperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection:'row'
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
