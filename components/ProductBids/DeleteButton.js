import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import Icons from "react-native-vector-icons/AntDesign" 
import Loader from '../Loader';

const DeleteButton = ({onPress, loading}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      {loading? <ActivityIndicator size={20} color="white" /> :<Icons name='delete' size={20} color="white" />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff5252',
        padding: 10
    },
    text: {
        textAlign: 'center'
    }
})

export default DeleteButton
