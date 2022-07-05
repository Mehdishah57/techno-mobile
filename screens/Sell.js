import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useMemo, useState } from 'react';
import { ThemeContext } from '../global/ThemeContext';
import { Formik } from 'formik';
import { TextInput, TouchableRipple } from 'react-native-paper';
import CategorySection from '../components/Sell/CategorySection';
import { productSchema } from '../schemas/product';
import ErrorText from '../components/ErrorText';
import ImageSection from '../components/Sell/ImageSection';
import Icons from "react-native-vector-icons/Entypo"
import addProduct from '../services/addProduct';

const Sell = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [theme] = useContext(ThemeContext);
  
  const {cityName, cityId} = route.params || {};

  const fieldTheme = useMemo(() => ({
		colors: {
			text: textStyles[theme].color,
			placeholder: textStyles[theme].color,
			primary: textStyles[theme].color,
      background: backgroundStyles[theme].backgroundColor
		}
	}), [theme])

  const handleSubmit = async values => {
    if(!cityId) return alert("Please select a city!")
    setLoading(true)
    const body = { ...values, location: cityId };
    const [data, error] = await addProduct(body);
    if(error)
      {
        setLoading(false);
        console.log(error.response?.data )
        return alert(error.response?.data || "There was an error posting your item");
      }
    navigation.navigate("Landing");
  }

  if(loading) return <View style={[styles.container, backgroundStyles[theme]]}>
    <ActivityIndicator size={"large"} color={textStyles[theme].color} />
  </View>
  return (
    <View style={[styles.container, backgroundStyles[theme]]}>
      <Formik
        initialValues={{
          picture: {
            image1: '',
            image2: undefined,
            image3: undefined,
            image4: undefined,
            image5: undefined,
            image6: undefined,
          },
          title: '',
          price: '',
          description: '',
          category: '',
          subCategory: '',
          location: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={productSchema}
      >
        {({ 
          handleSubmit, 
          handleChange, 
          errors, 
          values, 
          touched, 
          setFieldTouched, 
          setFieldValue }) => (
          <ScrollView style={[styles.p10]}>
            <View style={[styles.fieldWrapper,styles.border, borderStyles[theme]]}>
              <Text style={[styles.head,textStyles[theme]]}>Add Images for your item</Text>
              <ImageSection touched={touched.picture} error={errors.picture} pictures={values.picture} setFieldValue={setFieldValue} />
            </View>
            <View style={[styles.fieldWrapper,styles.border, borderStyles[theme]]}>
              <Text style={[styles.head,textStyles[theme]]}>Product Title</Text>
              <TextInput
                label="Title"
                mode='outlined'
                error={touched.title ? errors.title : null}
                onChangeText={handleChange("title")}
                onBlur={() => setFieldTouched("title")}
                theme={fieldTheme}
              />
              <ErrorText touched={touched.title} error={errors.title} />
            </View>
            <View style={[styles.fieldWrapper,styles.border, borderStyles[theme]]}>
            <Text style={[styles.head,textStyles[theme]]}>Price</Text>
              <TextInput
                label="Price"
                mode='outlined'
                error={touched.price ? errors.price : null}
                onChangeText={handleChange("price")}
                onBlur={() => setFieldTouched("price")}
                theme={fieldTheme}
              />
              <ErrorText touched={touched.price} error={errors.price} />
            </View>
            <View style={[styles.fieldWrapper,styles.border, borderStyles[theme]]}>
              <Text style={[styles.head,textStyles[theme]]}>Choose a category for your item</Text>
              <CategorySection 
                categoryError={errors.category} 
                categoryTouched={touched.category}
                subCategoryError={errors.subCategory}
                subCategoryTouched={touched.subCategory}
                setFieldValue={setFieldValue}
              />
            </View>
            <View style={[styles.fieldWrapper,styles.border, borderStyles[theme]]}>
            <Text style={[styles.head,textStyles[theme]]}>Choose a location</Text>
              <TouchableRipple 
                rippleColor={backgroundStyles[theme].backgroundColor} 
                onPress={()=>navigation.navigate("LocationSection")}>
                <View style={[borderStyles[theme],styles.locationItem]}>
                  <Text style={[styles.locationText,textStyles[theme]]}>{cityName || "Location"}</Text>
                  <Icons name='chevron-down' size={20} color={textStyles[theme].color} /> 
                </View>
              </TouchableRipple>
            </View>
            <View style={[styles.fieldWrapper,styles.border, borderStyles[theme]]}>
              <Text style={[styles.head,textStyles[theme]]}>Add a Description</Text>
              <TextInput
                label="Description"
                mode='outlined'
                error={touched.description ? errors.description : null}
                onChangeText={handleChange("description")}
                onBlur={() => setFieldTouched("description")}
                theme={fieldTheme}
                multiline
                numberOfLines={20}
              />
              <ErrorText touched={touched.description} error={errors.description} />
            </View>
            <View style={[styles.fieldWrapper,styles.border, borderStyles[theme]]}>
              <TouchableRipple onPress={handleSubmit} rippleColor={theme==="dark"?"black":"white"} style={[
                styles.btnView, 
                backgroundStyles[theme==="dark"?"light":"dark"],
                borderStyles[theme]]}>             
                  <Text style={[styles.btnText, theme!=='light'?textStyles["light"]: {color: 'white'}]}>PUBLISH NOW</Text>               
              </TouchableRipple>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  fieldWrapper: {
    padding: 20
  },
  head: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  border: {
    borderWidth: 2,
    borderBottomWidth: 0
  },
  p10: {
    padding: 10
  },
  btnView: {
    width: '40%',
    padding: 15,
    borderRadius: 10
  },
  btnText: {
    textAlign: 'center'
  },
  locationText: {
    fontSize: 14
  },
  locationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 5
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: 'black' },
  light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
  dark: { color: 'gray' },
  light: { color: 'black' }
})

const borderStyles = StyleSheet.create({
  dark: { borderColor: 'gray' },
  light: {  borderColor: 'black' }
})

export default Sell
