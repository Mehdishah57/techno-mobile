import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from "react-native-paper"
import React, { useContext, useState, useMemo, useLayoutEffect } from 'react';
import Icons from "react-native-vector-icons/FontAwesome5"
import { ThemeContext } from '../../global/ThemeContext';
import { SearchContext } from '../../global/SearchContext';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
    const [text, setText] = useState("");
    const [theme] = useContext(ThemeContext);
    const [search, setSearch] = useContext(SearchContext);

    const navigation = useNavigation();

    const handleSearch = () => setSearch(text)

    const handleChange = text => setText(text)

    const fieldTheme = useMemo(() => ({
        colors: {
            text: textStyles[theme].color,
            placeholder: textStyles[theme].color,
            primary: textStyles[theme].color,
            background: backgroundStyles[theme].backgroundColor
        }
    }), [theme])

    useLayoutEffect(()=>{
        if(search) setText(search);
    } ,[])

    return (
        <View style={styles.main}>
            <TextInput
                mode="outlined"
                label="Search"
                value={text}
                theme={fieldTheme}
                onChangeText={handleChange}
                style={styles.input}
            />
            <TouchableOpacity onPress={handleSearch} style={[styles.button,buttonStyles[theme]]}>
                <Icons name="search" size={25} color={backgroundStyles[theme].backgroundColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Filters")} style={[styles.button,buttonStyles[theme]]}>
                <Icons name="sliders-h" size={25} color={backgroundStyles[theme].backgroundColor} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    input: {
        width: '70%'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginLeft: 10,
        borderRadius: 5
    }
})

const backgroundStyles = StyleSheet.create({
    dark: { backgroundColor: 'black' },
    light: { backgroundColor: 'white' }
})

const buttonStyles = StyleSheet.create({
    light: { backgroundColor: 'black' },
    dark: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
    dark: { color: 'white' },
    light: { color: 'black' }
})

export default React.memo(Search, () => true);