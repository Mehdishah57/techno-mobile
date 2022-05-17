import { 
  View, 
  Image, 
  StyleSheet, 
  Text, 
  TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from './../global/UserContext';
import Input from '../components/Input';
import logo from "../assets/logo.png";
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { loginSchema } from "../schemas/login";
import login from '../services/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';


const Login = () => {
  const [,setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async values => {
    setLoading(true)
    const [data, error] = await login(values.email, values.password);
    if(error) setLoading(false);
    if (error) return setError(error.response?.data || error.message || "We are having some issues 😢😢😢");
    await AsyncStorage.setItem("fyptoken", data.token)
    setUser(data.user);
  }

  if(loading) return <View style={styles.container}>
    <LottieView source={require("../animations/loader.json")} autoPlay loop />
  </View>
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={logo}
          style={styles.image}
        />
      </View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <View style={styles.inputWrapper}>
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
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={[styles.button,styles.primary]}>
                  <Text style={styles.btnText}>SignIn</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
                <View style={styles.button}>
                  <Text style={styles.btnText}>SignUp</Text>
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
    backgroundColor: '#FFFFFF'
  },
  imageWrapper: {
    position: "relative",
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    overflow: "hidden"
  },
  image: {
    position: 'absolute',
    width: 200,
    top:-60
  },
  inputWrapper: {
    width: "90%",
    height: 170,
    justifyContent: 'space-evenly'
  },
  buttonContainer: {
    width: "50%",
  },
  error: {
    textAlign: 'center',
    color: 'red',
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

export default Login;