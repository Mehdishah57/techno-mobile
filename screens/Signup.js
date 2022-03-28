import React, { useContext, useState } from 'react'
import { View, TouchableOpacity , StyleSheet, Text } from 'react-native'
import { UserContext } from './../global/UserContext';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signupSchema} from "../schemas/signup";
import signup from '../services/signup';
import LottieView from 'lottie-react-native';

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const [,setUser] = useContext(UserContext);

  const navigation = useNavigation();

  const handleSubmit = async values => {
    setLoading(true);
    const [data, error] = await signup(values);
    if(error) {
      setError(error.response?.data || "We are sorry but it isn't working 😢😢😢");
      setLoading(false);
      return;
    }
    await AsyncStorage.setItem("fyptoken",data.token)
    setUser(data.user);
    setLoading(false);
  }

  if(loading) return <View style={styles.container}>
    <LottieView source={require("../animations/loader.json")} autoPlay loop />
  </View>
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an account!</Text>
      <Formik
        initialValues={{ name: '',email: '', password: '', countryCode:'', phoneNumber:'' }}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Name"
                onChangeText={handleChange("name")}
              />
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}
              <Input
                placeholder="Email"
                onChangeText={handleChange("email")}
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <Input
                placeholder="Password"
                onChangeText={handleChange("password")}
                secure
              />
              { errors.password && <Text style={styles.error}>{errors.password}</Text>}
              <Input
                placeholder="i:e 92"
                onChangeText={handleChange("countryCode")}
              />
              { errors.countryCode && <Text style={styles.error}>{errors.countryCode}</Text>}
              <Input
                placeholder="03xxxxxxxx"
                onChangeText={handleChange("phoneNumber")}
              />
              { errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit}>
                <View style={[styles.button,styles.primary]}>
                  <Text style={styles.btnText}>SignUp</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                <View style={styles.button}>
                  <Text style={styles.btnText}>SignIn</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#FFFFFF'
  },
  header: {
    textAlign:'center',
    fontSize:35,
    fontWeight:'bold',
    color:'black'
  },
  inputWrapper: {
    width: "90%",
    height: "60%",
    justifyContent:'space-evenly',
  },
  buttonContainer: {
    width: "50%",
  },
  error: {
    textAlign:'center',
    color:'red',
    marginTop:5,
    marginBottom:5
  },
  button: {
    backgroundColor: 'black',
    width:"100%",
    padding:10,
    alignItems:'center',
    borderRadius:10
  },
  btnText:{
    fontWeight:'bold',
    fontSize:15,
    color:'white'
  },
  primary: {
    backgroundColor:'black',
    borderRadius:10,
    marginBottom:10
  }
})


export default Signup