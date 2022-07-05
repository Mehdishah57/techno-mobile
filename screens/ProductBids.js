import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../global/ThemeContext';
import BidForm from '../components/ProductDetails/BidForm';
import fetchBids from '../services/fetchBids';
import BidItem from '../components/ProductBids/BidItem';
import Loader from '../components/Loader';
import { UserContext } from '../global/UserContext';

const ProductBids = ({ route, navigation }) => {
	const [loading, setLoading] = useState(true);
	const [bids, setBids] = useState([]);
	const [theme] = useContext(ThemeContext);
	const [user] = useContext(UserContext);
	const { product } = route.params;
	const fetchBid = useRef(null);

	fetchBid.current = async () => {
		const [data, error] = await fetchBids(1, 3, product._id);
		if (data) setBids(data);
	
		setLoading(false)
	}

	useEffect(() => {
		fetchBid.current();
	}, [])

	const handleDelete = id => setBids([...bids.filter(item => item._id !== id)]);
	

	if (loading) return <Loader size={60} />
	return (
		<ScrollView style={[styles.main, backgroundStyles[theme]]} contentContainerStyle={styles.mainContainer}>
			{user._id === product.owner?._id ?
				null
				:
				<>
					<Text style={[styles.head, textStyles[theme]]}>View and Place Bids</Text>
					<BidForm fetchBid={fetchBid.current} loading={loading} setLoading={setLoading} product={product} productId={product._id} />
				</>}
			{bids.map((item, index) => <BidItem deleteBid={handleDelete} index={index} item={item} key={item._id} />)}
			{!loading && !bids.length ? <Text style={[styles.noResult, textStyles[theme]]}>Product Doesn't have any bids</Text> : null}
			{!loading && bids.length ? <Text style={[styles.info, textStyles[theme]]}>Info: Swipe left to delete!</Text>: null}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	main: {
		display: 'flex',
		padding: 20
	},
	mainContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	head: {
		fontSize: 22,
		marginBottom: 20,
		fontWeight: 'bold'
	},
	noResult: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	info: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 10
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

export default ProductBids;