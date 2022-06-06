import {
	StyleSheet,
	View
} from 'react-native'
import React, { useContext } from 'react'
import SearchSection from '../components/Home/SearchSection';
import CategoryList from '../components/Home/CategoryList';
import CitySelect from '../components/Home/CitySelect';
import { ThemeContext } from '../global/ThemeContext';
import ProductList from '../components/Home/ProductList';

const Home = ({ navigation }) => {
	const [theme] = useContext(ThemeContext);

	return (
		<View style={[styles.container, backgroundStyles[theme]]}>
			<SearchSection />
			<CitySelect navigation={navigation} />
			<CategoryList />
			<ProductList navigation={navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	}
})

const backgroundStyles = StyleSheet.create({
	dark: { backgroundColor: 'black' }
  })
  
  const textStyles = StyleSheet.create({
	dark: { color: 'white' },
	light: { color: 'black' }
  })
  

export default Home;
