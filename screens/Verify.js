import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react';
import { TextInput, HelperText } from "react-native-paper"
import { Formik } from 'formik';
import { codeSchema } from '../schemas/code';
import { ThemeContext } from '../global/ThemeContext';
import { UserContext } from "../global/UserContext";
import verify from '../services/verify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sendCode from '../services/sendCode';

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [theme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext)

  const handleSubmit = async values => {
    setLoading(true);
    const [data, error] = await verify(values.code);
    if(error) alert(error.response?.data || "Verification Failed!")
    console.log(error)
    if(data) {
      await AsyncStorage.setItem("fyptoken", data);
      return setUser({...user, verified: true});
    }
    setLoading(false);
  }

  const handleResend = async() => {
    setLoading(true);
    const [data, error] = await sendCode();
    if(error) alert("Failed to send code")
    if(data) alert("Code sent successfully")
    setLoading(false);
  }

  const handleLogout = async() => {
    await AsyncStorage.removeItem("fyptoken");
    setUser({});
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
    <View style={[styles.main, backgroundStyles[theme]]}>
      <Formik
        initialValues={{code: ''}}
        onSubmit={handleSubmit}
        validationSchema={codeSchema}
      >
        {({handleSubmit, handleChange, errors, touched, setFieldTouched})=><View style={[styles.form]}>
            <TextInput
              mode="outlined"
              label="Code"
              onChangeText={handleChange("code")}
              theme={fieldTheme}
              error={touched.code?errors.code:null}
              onBlur={()=>setFieldTouched("code")}
              style={{ width: '100%'}}
            />
            <HelperText type='error' visible={touched.code && errors.code}>
              {errors.code}
            </HelperText>
            <TouchableOpacity style={[styles.button, additionalStyles[theme]]} onPress={handleSubmit}>
              <Text style={[styles.btnText,textStyles[theme]]}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, additionalStyles[theme]]} onPress={handleResend}>
              <Text style={[styles.btnText,textStyles[theme]]}>Resend Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, additionalStyles[theme]]} onPress={handleLogout}>
              <Text style={[styles.btnText,textStyles[theme]]}>Logout</Text>
            </TouchableOpacity>
          </View>}
      </Formik>
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
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 450
  },
  button: {
    width: 220,
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  btnText: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: 'black' },
  light: { backgroundColor: 'white' }
})

const additionalStyles = StyleSheet.create({
  dark: { backgroundColor: '#333333' },
  light: { backgroundColor: 'black' }
})

const textStyles = StyleSheet.create({
  dark: { color: 'gray' },
  light: { color: 'white' }
})

export default Verify;
