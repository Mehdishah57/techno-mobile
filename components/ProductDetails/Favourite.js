import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useRef, useLayoutEffect } from 'react'
import { UserContext } from '../../global/UserContext';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import addToFav from "../../services/addToFav";
import removeFromFav from "../../services/removeFromFav";

const Favourite = ({ navigation, product }) => {
	const [user, setUser] = useContext(UserContext);

	const addToFavourites = async () => {
		const favourites = user.favourites.find(id => id === product._id);
		if (favourites) return
		setUser({ ...user, favourites: [...user.favourites, product._id] })
		await addToFav(product._id);
	}

	const removeFromFavourites = async () => {
		const favourites = user.favourites.filter(id => id !== product._id);
		if (!favourites) return
		setUser({ ...user, favourites });
		await removeFromFav(product._id);
	}

	if (!user._id)
		return (
			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<AntDesignIcons name='heart' color='gray' size={18} />
			</TouchableOpacity>
		)

	const favourite = user.favourites.find(itm => itm === product._id);
	if (!favourite) return (
		<TouchableOpacity onPress={addToFavourites}>
			<AntDesignIcons name='hearto' color='red' size={20} />
		</TouchableOpacity>
	)
	return (
		<TouchableOpacity onPress={removeFromFavourites}>
			<AntDesignIcons name='heart' color='red' size={18} />
		</TouchableOpacity>
	)

}

const styles = StyleSheet.create({})

export default Favourite;
