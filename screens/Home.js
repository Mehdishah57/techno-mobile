import {
	StyleSheet,
	View,
	ScrollView,
	ActivityIndicator,
	Text
} from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { FilterContext } from '../global/FilterContext';
import getProducts from '../services/getProducts';
import ProductItem from '../components/Card';
import SearchSection from '../components/Home/SearchSection';
import CategoryList from '../components/Home/CategoryList';
import CitySelect from '../components/Home/CitySelect';


const Home = ({ navigation }) => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useContext(FilterContext);

	const fetchProducts = useRef();
	fetchProducts.current = async (payload) => {
		setLoading(true);
		const [data, error] = await getProducts(payload);
		if (error) return console.log(error);
		setProducts(data);
		setLoading(false);
	}

	useEffect(() => {
		fetchProducts.current({ pageNumber, filters, search });
	}, [pageNumber, filters, search]);

	const handleSearch = (text) => setSearch(text);

	return (
		<View style={styles.container}>
			<SearchSection handleSearch={handleSearch} />
			<CitySelect navigation={navigation} />
			<CategoryList />
			{!loading ? <ScrollView
				style={styles.products}
				contentContainerStyle={styles.scroll}>
				{products.map(
					product => <ProductItem
						onPress={() => navigation.navigate("Details", { _id: product._id })}
						key={product._id}
						item={product}
					/>)}
					{!loading && !products.length? <Text style={styles.noResult}>No Results</Text>: null}
			</ScrollView> : <View style={styles.loading}>
				<ActivityIndicator size={60} color="black" />
			</View>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: 'white',
	},
	products: {
		width: '100%'
	},
	scroll: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	loading: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '90%'
	},
	noResult: {
		color:'gray',
		fontSize:18,
		fontWeight: 'bold'
	}
})

export default Home;
