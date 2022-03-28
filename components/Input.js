import React from "react";
import {
    TextInput,
    StyleSheet
} from "react-native";

const Input = ({placeholder, value, onChangeText, secure}) => {
    return <TextInput 
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secure?true:false}
    />
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 60,
        borderRadius:50,
        padding:10,
        backgroundColor:'#f8f8f8',
    }    
})

export default Input;