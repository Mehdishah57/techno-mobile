import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import getProducts from '../services/getProducts';
import ProductItem from '../components/Card';
import SearchSection from '../components/Home/SearchSection';
import { FAB } from 'react-native-paper';

const Home = ({ navigation }) => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [filters, setFilters] = useState({});

	const fetchProducts = useRef();
	fetchProducts.current = async (payload) => {
		const [data, error] = await getProducts(payload);
		if (error) return console.log(error);
		if (!data?.length) return console.warn("Nothing");
		setProducts(data);
	}

	useEffect(() => {
		if (!search) fetchProducts.current({ filters, pageNumber });
		else fetchProducts.current({ pageNumber, filters, search });
	}, [pageNumber, filters, search]);

	const handleSearch = (text) => setSearch(text);

	return (
		<View style={styles.container}>
			<SearchSection handleSearch={handleSearch} />
			<ScrollView style={styles.products} contentContainerStyle={styles.scroll}>
				{products.map(
					product => <ProductItem
						onPress={() => navigation.navigate("Details", { _id: product._id })}
						key={product._id}
						item={product}
					/>)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: '#FFF',
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
	}
})

export default Home;
