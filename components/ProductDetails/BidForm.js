import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useMemo, useContext } from 'react';
import { Formik } from 'formik';
import { bidSchema } from '../../schemas/bid';
import { TextInput, TouchableRipple, HelperText } from 'react-native-paper';
import { ThemeContext } from '../../global/ThemeContext';
import bidItem from '../../services/bidItem';
import ErrorText from '../ErrorText';

const BidForm = ({ productId, setLoading, fetchBid }) => {
    const [theme] = useContext(ThemeContext);

    const handleSubmit = async values => {
        setLoading(true);
        const [data, error] = await bidItem(values.bid, productId)
        if (!data){
            setLoading(false);
            return alert(error.response?.data||"Failed to place bid");  
        } 
        fetchBid();
        alert("Successfully placed bid");
    }

    const fieldTheme = useMemo(() => ({
        colors: {
            text: textStyles[theme].color,
            placeholder: textStyles[theme].color,
            primary: textStyles[theme].color,
            background: backgroundStyles[theme].backgroundColor
        }
    }), [theme])

    return (
        <View style={styles.formWrapper}>
            <Formik
                initialValues={{ bid: '' }}
                validationSchema={bidSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleChange, errors, touched, setFieldTouched }) => <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="Bid"
                            mode="outlined"
                            onChangeText={handleChange("bid")}
                            onBlur={() => setFieldTouched("bid")}
                            theme={fieldTheme}
                            error={touched.bid && errors.bid}
                        />
                        <HelperText type='error' visible={touched.bid && errors.bid}>
                            {errors.bid}
                        </HelperText>
                    </View>
                    <TouchableRipple style={[styles.button, backgroundStyles[theme]]} onPress={handleSubmit}>
                        <Text style={[styles.btnText, textStyles[theme]]}>Bid</Text>
                    </TouchableRipple>
                </View>}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    formWrapper: {
        maxWidth: 450,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        alignSelf: 'center',
        height: 50,
        width: 50,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        textAlign: 'center'
    }
})

const backgroundStyles = StyleSheet.create({
    dark: { backgroundColor: '#333333' },
    light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
    dark: { color: 'gray' },
    light: { color: 'black' }
})


export default BidForm
