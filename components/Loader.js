import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../global/ThemeContext'

const Loader = ({size='large'}) => {
    const [theme] = useContext(ThemeContext);

    return (
        <View style={[styles.main, backgroundStyles[theme]]}>
            <ActivityIndicator size={size} color={textStyles[theme].color} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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

export default Loader;