import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';
import fetchProductyById from "../services/fetchProductById";

const ProductDetails = ({ route }) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const fetchProduct = useRef();

    fetchProduct.current = async () => {
		const [data, error] = await fetchProductyById(route.params._id);
		if (!error) setProduct(data)
        else console.log(error)
        setLoading(false);
	}

    useEffect(()=>{
        fetchProduct.current();
    },[])

    if(loading) return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" animating={true} color={Colors.black} />
    </View>
    return (
        <View style={styles.container}>
            <Text style={{color:"#555"}}>{JSON.stringify(product,null, 2)}</Text>
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
    loadingContainer:{
        flex: 1,
        height: "100%",
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent:'center'
    }
})

export default ProductDetails;