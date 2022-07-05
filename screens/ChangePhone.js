import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { ThemeContext } from '../global/ThemeContext';
import { Formik } from "formik";
import { TextInput, TouchableRipple } from "react-native-paper";
import { phoneSchema } from '../schemas/phone';
import ErrorText from "../components/ErrorText";
import changePhone from '../services/changePhone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../global/UserContext';
import Loader from '../components/Loader';

const ChangePhone = () => {
  const [loading, setLoading] = useState(false);
  const [theme] = useContext(ThemeContext);
  const [,setUser] = useContext(UserContext)

  const fieldTheme = useMemo(() => ({
		colors: {
			text: textStyles[theme].color,
			placeholder: textStyles[theme].color,
			primary: textStyles[theme].color,
      background: backgroundStyles[theme].backgroundColor
		}
	}), [theme])

  const handleSubmit = async values => {
    setLoading(true);
    const {countryCode, phoneNumber} = values;
    const [data, error] = await changePhone({countryCode, phoneNumber});
    if(!error) {
      const {token, user} = data;
      await AsyncStorage.setItem("fyptoken",token);
      setUser(user); 
    }
    setLoading(false);
  }

  if(loading) return <Loader size={60} />
  return (
    <View style={[styles.main, backgroundStyles[theme]]}>
      <Formik
        initialValues={{countryCode: '', phoneNumber: ''}}
        validationSchema={phoneSchema}
        onSubmit={handleSubmit}
      >
        {({handleSubmit, handleChange, errors, touched, setFieldTouched})=><View style={styles.form}>
            <Text style={[styles.head, textStyles[theme]]}>Change your Phone</Text>
            <TextInput 
              label="Country Code"
              mode='outlined'
              onChangeText={handleChange("countryCode")}
              onBlur={()=>setFieldTouched("countryCode")}
              theme={fieldTheme}
              error={touched.countryCode && errors.countryCode}
              style={styles.input}
            />
            <ErrorText error={errors.countryCode} touched={touched.countryCode} />
            <TextInput 
              label="Phone Number"
              mode='outlined'
              onChangeText={handleChange("phoneNumber")}
              onBlur={()=>setFieldTouched("phoneNumber")}
              theme={fieldTheme}
              error={touched.phoneNumber && errors.phoneNumber}
              style={styles.input}
            />
            <ErrorText error={errors.phoneNumber} touched={touched.phoneNumber} />
            <TouchableRipple style={[styles.button,additionalStyles[theme]]} onPress={handleSubmit}>
              <Text style={[styles.btnText,textStyles[theme]]}>Change</Text>
            </TouchableRipple>
          </View>}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 20
  },
  form: {
    width: '100%',
    maxWidth: 400
  },
  button: {
    padding: 10,
    width: 250,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10
  },
  btnText: {
    textAlign: 'center'
  },
  head: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  input: {
    marginBottom: 10
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: 'black' },
  light: { backgroundColor: 'white' }
})

const additionalStyles = StyleSheet.create({
  dark: { backgroundColor: '#333333' },
  light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
  dark: { color: 'gray' },
  light: { color: 'black' }
})

export default ChangePhone;
