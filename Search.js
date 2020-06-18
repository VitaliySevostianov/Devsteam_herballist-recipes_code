import React from 'react';
import { View } from 'react-native';

import SearchPage from './Components/SearchPage';
import SearchList from './Components/SearchList';

import { styles } from '../content/styles';

const Search = ({ route, navigation }) => {
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.toolbarAbsolutePosition}>
				<SearchList
					filter="Поиск"
					navigation={navigation}
					route={route}
				/>
			</View>
			<View style={styles.contentListAbsolutePosition}>
				<SearchPage
					filter="Поиск"
					navigation={navigation}
					route={route}
				/>
			</View>
		</View>
	);
};

export default Search;
