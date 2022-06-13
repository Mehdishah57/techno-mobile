import {
	StyleSheet,
	View
} from 'react-native'
import React, { useContext } from 'react'
import CategoryList from '../components/Home/CategoryList';
import ProductList from '../components/Home/ProductList';
import SearchBox from '../components/Home/SearchBox';
import CitySelect from '../components/Home/CitySelect';
import { ThemeContext } from '../global/ThemeContext';

const Home = ({ navigation }) => {
	const [theme] = useContext(ThemeContext);

	return (
		<View style={[styles.container, backgroundStyles[theme]]}>
			<SearchBox navigation={navigation} />
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

export default Home;
