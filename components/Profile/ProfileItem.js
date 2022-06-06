import { StyleSheet, Text, View } from 'react-native';
import React, {useContext} from 'react';
import { TouchableRipple } from "react-native-paper";
import { ThemeContext } from '../../global/ThemeContext';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ProfileItem = ({ onPress, title, icon }) => {
  const [theme] = useContext(ThemeContext)
  return (
    <TouchableRipple style={[styles.container,backgroundStyles[theme]]} onPress={onPress}>
      <View style={styles.subContainer}>
        <Text style={[styles.title, textStyles[theme]]}>{title || "Title"}</Text>
        <FontAwesome5 name={icon} color={textStyles[theme].color} size={20} />
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:20
  },
  subContainer: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection: 'row'
  },
  title: {
    fontWeight: 'bold'
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

export default ProfileItem
