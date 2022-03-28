import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import getProducts from '../services/getProducts';
import ProductItem from '../components/Card';
import { TextInput } from 'react-native-paper';

import SearchSection from '../components/Home/SearchSection';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [pageNumber, setPageNumber] = useState(1);

	const fetchProducts = useRef();
	fetchProducts.current = async (payload) => {
		const [data, error] = await getProducts(payload);
		if (error) return console.log(error);
		if (!data?.length) return console.warn("Nothing")
		setProducts(data);
	}

	useEffect(() => {
		if (!search) fetchProducts.current({ pageNumber });
		else fetchProducts.current({ pageNumber, search });
	}, [pageNumber, search]);

	const handleSearch = (text) => setSearch(text); 

	return (
		<View style={styles.container}>
			<SearchSection handleSearch={handleSearch} />
			<ScrollView style={{ width: '100%' }}>
				{products.map(product => <ProductItem item={product} />)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: '#FFF',
		alignItems: 'center'
	}
})

export default Home;
