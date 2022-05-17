import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import getProducts from '../services/getProducts';
import ProductItem from '../components/Card';
import SearchSection from '../components/Home/SearchSection';
import { FAB } from 'react-native-paper';

const Home = ({navigation}) => {
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
			<ScrollView style={{ width: '100%' }}>
				{products.map(
					product => <ProductItem 
						onPress={() => navigation.navigate("Details", {_id: product._id})}
						key={product._id} 
						item={product} 
					/>)}
			</ScrollView>
			<FAB
				style={styles.fab}
				icon="menu"
				onPress={() => console.log('Pressed')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: '#FFF',
		alignItems: 'center'
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	  },
})

export default Home;
