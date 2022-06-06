import { StyleSheet, FlatList } from 'react-native'
import React, {useState, useRef, useEffect, useContext} from 'react'
import getFreshProducts from '../../services/getFreshProducts';
import CardSkeletonList from '../CardSkeletonList';
import ProductItem from '../Card';
import { CityContext } from '../../global/CityContext';

const ProductList = ({navigation}) => {
	const [products, setProducts] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize] = useState(20);
	const [loading, setLoading] = useState(false);
	const [cities] = useContext(CityContext);
	const [shouldUpdate, setShouldUpdate] = useState(true);

    const fetchProducts = useRef();
	fetchProducts.current = async (payload) => {
		setLoading(true);
		setShouldUpdate(true);
		const [data, error] = await getFreshProducts(payload);
		if (error) return console.log(error.response?.data);
		setProducts(data);
		setLoading(false);
	}

	const fetchNewProducts = useRef();
	fetchNewProducts.current = async (payload) => {
		setLoading(true);
		const [data, error] = await getFreshProducts(payload);
		if (error) return console.log(error.response?.data);
		if(!data.length) {
			setShouldUpdate(false);
			return setLoading(false);
		};
		const temp = [...products, ...data];
		setProducts(temp);
		setLoading(false);
	}

    useEffect(() => {
        fetchProducts.current({ pageNumber: 1, pageSize, city: cities._id });
    }, [cities]);

    useEffect(() => {
        if (pageNumber === 1) return;
        fetchNewProducts.current({ pageNumber, pageSize, city: cities._id });
    }, [pageNumber])


    const handlePageChange = () => {
        if (!shouldUpdate) return;
        if (products.length % pageSize === 0)
            setPageNumber(prevNo => prevNo + 1)
    }

    return (
        <FlatList
            style={styles.products}
            numColumns={2}
            data={products}
            renderItem={({ item }) => <ProductItem
                item={item}
                onPress={() => navigation.navigate("Details", { _id: item._id })}
            />}
            onEndReached={handlePageChange}
            refreshing={loading}
            onRefresh={() => setPageNumber(1)}
            ListFooterComponent={loading ? CardSkeletonList : undefined}
        />
    )
}

const styles = StyleSheet.create({
	products: {
		width: '100%'
	},
	scroll: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loading: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '90%'
	},
	noResult: {
		color: 'gray',
		fontSize: 18,
		fontWeight: 'bold'
	}
})

export default ProductList
