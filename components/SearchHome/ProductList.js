import { StyleSheet, ScrollView, Text, RefreshControl } from 'react-native'
import React, {useState, useRef, useEffect, useContext} from 'react'
import getProducts from '../../services/getProducts';
import CardSkeletonList from '../CardSkeletonList';
import ProductItem from '../Card';
import { CityContext } from '../../global/CityContext';
import { FilterContext } from '../../global/FilterContext';
import { SearchContext } from '../../global/SearchContext';
import { MainCategoryContext } from '../../global/MainCategoryContext';
import { SubCategoryContext } from '../../global/SubCategoryContext';

const ProductList = ({navigation}) => {
	const [products, setProducts] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize] = useState(10);
	const [loading, setLoading] = useState(false);
	const [cities] = useContext(CityContext);
    const [search] = useContext(SearchContext);
    const [filters] = useContext(FilterContext);
    const [mainCategory] = useContext(MainCategoryContext);
    const [subCategory] = useContext(SubCategoryContext);
	const [shouldUpdate, setShouldUpdate] = useState(true);

    const fetchProducts = useRef();
	fetchProducts.current = async (payload) => {
		setLoading(true);
		setShouldUpdate(true);
		setPageNumber(1);
		const [data, error] = await getProducts(payload);
		if (error) return console.log(error.response?.data);
		setProducts(data);
		setLoading(false);
	}

	const fetchNewProducts = useRef();
	fetchNewProducts.current = async (payload) => {
		setLoading(true);
		const [data, error] = await getProducts(payload);
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
        if(pageNumber !== 1) return;
        fetchProducts.current({ pageNumber: 1, pageSize, search, filters: {search, mainCategory, subCategory, city: cities._id}  });
    }, [cities, search, mainCategory, subCategory, cities._id]);

    useEffect(() => {
        if (pageNumber === 1) return;
        fetchNewProducts.current({ pageNumber, pageSize, search, filters: {search, mainCategory, subCategory, city: cities._id} });
    }, [pageNumber, cities, search, mainCategory, subCategory, cities._id])

    const handlePageChange = () => {
        if (!shouldUpdate) return;
        if (products.length/pageNumber >= pageSize)
            setPageNumber(prevNo => prevNo + 1)
    }

	const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >=
		  contentSize.height - paddingToBottom;
		};

	return(
		<ScrollView 
			style={styles.products} 
			contentContainerStyle={styles.container}
			refreshControl={<RefreshControl 
				refreshing={loading}
				onRefresh={()=>fetchProducts.current({ pageNumber: 1, pageSize, search, filters: {search, mainCategory, subCategory, city: cities._id}  })}
			/>}
			onMomentumScrollEnd={(event) => { 
				if (isCloseToBottom(event.nativeEvent)) {
					handlePageChange()
				}
			   }
			 }
		>
			{products.length ? products.map(item => <ProductItem
				key={item._id}
				item={item} 
				onPress={() => navigation.navigate("Details", { _id: item._id })} />)
			:null}
			{!products.length && !loading ? <Text style={styles.noResult}>No Results</Text> : null}
			{loading ? <CardSkeletonList /> :null}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	products: {
		display: 'flex',
		width: '100%',
		marginBottom: 100
	},
	container: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection:'row',
		flexWrap: 'wrap'
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

export default React.memo(ProductList)

