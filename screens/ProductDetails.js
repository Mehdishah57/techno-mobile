import React, { useState, useEffect, useRef, useContext } from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	Platform
} from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';
import Carousel from '../components/ProductDetails/Carousel';
import fetchProductyById from "../services/fetchProductById";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { UserContext } from '../global/UserContext';
import Favourite from '../components/ProductDetails/Favourite';
import MessageDialog from '../components/MessageDialog';

const ProductDetails = ({ route, navigation }) => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const [user, setUser] = useContext(UserContext);
	const fetchProduct = useRef();

	fetchProduct.current = async () => {
		const [data, error] = await fetchProductyById(route.params._id);
		if (!error) setProduct(data)
		else console.log(error)
		setLoading(false);
	}

	useEffect(() => {
		fetchProduct.current();
	}, [])

	const handleCall = () => {
		let number = "";
		if (Platform.OS === 'ios')
			number = `telprompt:${product.owner?.phoneNumber}`
		else if (Platform.OS === 'android')
			number = `tel:${product.owner?.phoneNumber}`
		else
			return alert("Calling for Your Platform isn't Supported.\nUser Phone is: " + product.owner?.phoneNumber)
		Linking.openURL(number);
	}

	if (loading) return <View style={styles.loadingContainer}>
		<ActivityIndicator size="large" animating={true} color={Colors.black} />
	</View>
	return (
		<View style={styles.container}>
			<Carousel images={product?.picture} />
			<ScrollView >
				<View style={styles.head}>
					<View style={styles.headOne}>
						<Text style={styles.price}>RS: {product.price}</Text>
						<Favourite navigation={navigation} product={product} />
					</View>
					<Text style={styles.title}>{product.title}</Text>
					<Text style={styles.city}>{product.location?.city}</Text>
				</View>
				<Text style={styles.descriptionHead}>Description</Text>
				<View style={styles.descriptionContainer}>
					<Text style={styles.description}>{product.description}</Text>
				</View>
			</ScrollView>
			<MessageDialog visible={visible} setVisible={setVisible} product={product} />
			<View style={styles.btnContiner}>
				<TouchableOpacity onPress={()=>setVisible(true)}>
					<View style={styles.btn}>
						<MaterialCommunityIcons name='message' color="white" size={20} />
						<Text style={styles.btnText}>Message</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleCall}>
					<View style={styles.btn}>
						<MaterialCommunityIcons name='phone' color="white" size={20} />
						<Text style={styles.btnText}>Call</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: '#FFF',
	},
	loadingContainer: {
		flex: 1,
		height: "100%",
		backgroundColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center'
	},
	head: {
		flex: 1,
		width: '100%'
	},
	headOne: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		padding: 10,
	},
	price: {
		color: "green",
		fontSize: 20,
		fontWeight: "bold"
	},
	title: {
		paddingRight: 10,
		paddingLeft: 10,
		color: 'black',
		fontSize: 16,
		width: '100%'
	},
	city: {
		paddingRight: 10,
		paddingLeft: 10,
		color: 'black',
		fontSize: 14,
		width: '100%'
	},
	descriptionContainer: {
		flex: 1,
		height: 200
	},
	descriptionHead: {
		paddingRight: 10,
		paddingLeft: 10,
		paddingTop: 10,
		color: 'black',
		fontWeight: 'bold',
		fontSize: 20,
		width: '100%'
	},
	description: {
		paddingRight: 10,
		paddingLeft: 10,
		color: 'black',
		fontSize: 14,
		width: '100%'
	},
	btnContiner: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		padding: 10
	},
	btn: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
		padding: 10,
		width: 120,
		borderRadius: 10
	},
	btnText: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		marginLeft: 5
	}
})

export default ProductDetails;