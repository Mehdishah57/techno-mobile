import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react';
import TouchBox from '../TouchBox';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ThemeContext } from '../../global/ThemeContext';

const SubCategoryItem = ({item, onPress}) => {
  const [theme] = useContext(ThemeContext);
  return (
    <TouchBox onPress={onPress}>
      <View style={[styles.container, backgroundStyles[theme]]}>
        <Text style={[styles.text, textStyles[theme]]}>{item}</Text>
        <FontAwesome5 name='angle-right' size={20} color={textStyles[theme].color} />
      </View>
    </TouchBox>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height: 80,
    padding: 10
  },
  text: {
    textAlign:'left',
    color:'gray'
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

export default SubCategoryItem;
