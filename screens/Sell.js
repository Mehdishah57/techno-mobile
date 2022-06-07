import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useMemo } from 'react';
import { ThemeContext } from '../global/ThemeContext';
import { Formik } from 'formik';
import { TextInput, TouchableRipple } from 'react-native-paper';
import CategorySection from '../components/Sell/CategorySection';
import LocationSection from '../components/Sell/LocationSection';
import { productSchema } from '../schemas/product';
import ErrorText from '../components/ErrorText';
import ImageSection from '../components/Sell/ImageSection';


const Sell = ({ navigation }) => {
  const [theme] = useContext(ThemeContext);

  const fieldTheme = useMemo(() => ({
		colors: {
			text: textStyles[theme].color,
			placeholder: textStyles[theme].color,
			primary: textStyles[theme].color,
      background: backgroundStyles[theme].color
		}
	}), [theme])

  const handleSubmit = async values => {
    console.log(values)
  }

  return (
    <View style={[styles.container, backgroundStyles[theme]]}>
      <Formik
        initialValues={{
          picture: {
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            image6: '',
          },
          title: '',
          price: '',
          description: '',
          category: '',
          subCategory: '',
          location: '',
          lng: '',
          lat: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={productSchema}
      >
        {({ handleSubmit, handleChange, errors, touched, setFieldTouched, setFieldValue }) => (
          <ScrollView style={[styles.p10]}>
            <View style={[styles.fieldWrapper,styles.border, borderStyles[theme]]}>
              <Text style={[styles.head,textStyles[theme]]}>Add Images for your item</Text>
              <ImageSection />
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
              <LocationSection />
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
                  <Text style={[styles.btnText, textStyles[theme==="dark"?"light":"dark"]]}>PUBLISH NOW</Text>               
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
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: 'black' },
  light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
  dark: { color: 'white' },
  light: { color: 'black' }
})

const borderStyles = StyleSheet.create({
  dark: { borderColor: 'white' },
  light: {  borderColor: 'black' }
})

export default Sell
