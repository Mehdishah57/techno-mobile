import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';

const SearchSection = ({ handleSearch }) => {
	const [search, setSearch] = useState("");
	return (
		<View style={styles.search}>
			<Searchbar
				placeholder="Search"
				onChangeText={text => setSearch(text)}
				onIconPress={() => handleSearch(search)}
				value={search}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	search: {
		justifyContent: 'center',
		width: '100%',
		marginBottom: 10
	}
})

export default SearchSection