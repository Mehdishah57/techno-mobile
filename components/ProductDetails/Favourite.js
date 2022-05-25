import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useRef, useLayoutEffect } from 'react'
import { UserContext } from '../../global/UserContext';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import addToFav from "../../services/addToFav";
import removeFromFav from "../../services/removeFromFav";

const Favourite = ({ navigation, product }) => {
	const [user, setUser] = useContext(UserContext);
	const [isFavourite, setIsFavourite] = useState(false);
	const checkFavourite = useRef();

	checkFavourite.current = () => {
		if (!user?.favourites?.length) return;
		const fav = user.favourites.find(id => id === product._id);
		if (!fav) return;
		setIsFavourite(true);
	}

	useLayoutEffect(() => {
		checkFavourite.current();
	}, [])

	const addToFavourites = async () => {
		if (!user?._id) return navigation.navigate("Login");
		const favourites = user.favourites.find(id => id === product._id);
		if (favourites) return
		setUser({ ...user, favourites: [...user.favourites, product._id] })
		await addToFav(product._id);
	}

	const removeFromFavourites = async () => {
		if (!user?._id) return navigation.navigate("Login");
		const favourites = user.favourites.filter(id => id !== product._id);
		if (!favourites) return
		setUser({ ...user, favourites });
		await removeFromFav(product._id);
	}

	return (
		<TouchableOpacity onPress={isFavourite ? removeFromFavourites : addToFavourites}>
			<MaterialCommunityIcons
				name={isFavourite ? 'heart' : 'heart-outline'}
				color={user?._id ? 'red' : "gray"}
				size={20}
			/>
		</TouchableOpacity>
	)
}

export default Favourite

const styles = StyleSheet.create({})