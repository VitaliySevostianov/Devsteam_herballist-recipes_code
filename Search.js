import React from 'react';
import { View } from 'react-native';

import SearchPage from './Components/SearchPage';
import SearchList from './Components/SearchList';

const Search = ({ route, navigation }) => {
	return (
		<View style={{ flex: 1 }}>
			<SearchList filter="Поиск" navigation={navigation} route={route} />
			<SearchPage filter="Поиск" navigation={navigation} route={route} />
		</View>
	);
};

export default Search;
