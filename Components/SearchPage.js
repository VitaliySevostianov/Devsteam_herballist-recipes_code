import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, View, Image, TouchableOpacity } from 'react-native';

import { imagesData } from '../../android/app/src/main/assets/images/photos/index';

import { styles } from './styles';

import {
	CommonActions,
	useNavigationState,
	useIsFocused,
} from '@react-navigation/native';

import { AdMobBanner } from 'react-native-admob';

import { LocalizationContext } from '../localizationContext';

const mapStateToProps = state => {
	return {
		content: state.content,
		images: state.images,
	};
};

const SearchPage = ({ navigation, route }) => {
	const { translations } = useContext(LocalizationContext);
	const isFocused = useIsFocused();
	const state = useNavigationState(state => state);

	if (
		state.routes[1] != undefined &&
		state.routes[1].name == 'Поиск' &&
		state.routes[2] == undefined &&
		isFocused == false
	) {
		navigation.dispatch(CommonActions.goBack());
	}

	let searchData = route.params.searchData;
	let isEmpty = route.params.isEmpty;

	let searchDataLength =
		route != undefined ? `${route.params.searchDataLength}` : 0;
	if (searchDataLength > 0) {
		isEmpty = false;
	}

	if (isEmpty == true) {
		return (
			<View style={styles.notFoundCard}>
				<Text style={styles.notFoundText}>
					{translations.nothing_was_found}
				</Text>
			</View>
		);
	} else if (isEmpty == false) {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={searchData}
					style={styles.itemList}
					renderItem={({ item }) => {
						return (
							<View>
								<TouchableOpacity
									style={styles.card}
									onPress={() => {
										return navigation.navigate('Контент', {
											html: item.html,
											recipeTitle: item.title,
											image: imagesData[item.img],
										});
									}}>
									<Image
										style={styles.smallImage}
										source={imagesData[item.img]}
									/>
									<Text style={styles.cardText}>
										{item.title}
									</Text>
								</TouchableOpacity>
							</View>
						);
					}}
					keyExtractor={item => `${item.id}`}
				/>
				<View style={styles.adContainer}>
					<AdMobBanner
						adSize="SMART_BANNER"
						adUnitID={
							Platform.OS == 'ios'
								? 'ca-app-pub-8323348147242911/9664734587'
								: 'ca-app-pub-8323348147242911/7178172049'
						}
						testDevices={[AdMobBanner.simulatorId]}
						onAdFailedToLoad={error => console.error(error)}
					/>
				</View>
			</View>
		);
	}
};

export default connect(mapStateToProps)(SearchPage);
