import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { ListItem, Toolbar } from 'react-native-material-ui';
import { styles, toolbarTheme } from '../../content/styles';

import { fillPrev } from '../Redux/actions';

import { LocalizationContext } from '../localizationContext';

const mapStateToProps = state => {
	return {
		content: state.content,
		images: state.images,
		prev: state.prev,
		currentLang: state.currentLang,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changePrev: data => {
			return dispatch(fillPrev(data));
		},
	};
};

const CustomSearchTitle = ({ title, resultLength }) => {
	const { translations } = useContext(LocalizationContext);
	let secondLine = `${translations.search_amount} ${resultLength}`;
	return (
		<View>
			<Text style={styles.customSearchTitle} numberOfLines={1}>
				{title}
			</Text>
			<Text style={styles.customSearchTitleSecondLine}>{secondLine}</Text>
		</View>
	);
};

const SearchList = ({
	content,
	images,
	navigation,
	filter,
	prev,
	route,
	changePrev,
}) => {
	const { translations } = useContext(LocalizationContext);
	const [searchFilter, setSearchFilter] = useState(
		route != undefined
			? `${route.params.title}`.replace(/\//, '').replace(/\/i/, '')
			: /(?:)/i,
	);
	const [isSearchActive, changeIsSearchActive] = useState(false);
	console.log(isSearchActive);
	let newSearchData = [];
	let searchData = [];
	let prevData = [];
	let searchDataLength =
		route != undefined ? `${route.params.searchDataLength}` : 0;

	if (prev != undefined) {
		for (let i = 0; i < prev.length; i++) {
			if (prev[i].title.search(searchFilter) !== -1) {
				searchData.push({
					...prev[i],
					id: `${i}p`,
				});
			}
			prevData.push({
				...prev[i],
				id: `${i}p`,
			});
		}
	}
	for (let i = 0; i < content.length; i++) {
		if (content[i].title.search(searchFilter) !== -1) {
			searchData.push({
				...content[i],
				img: images[i],
				id: prev.length + i,
			});
		}
	}
	for (let i = 0; i < content.length; i++) {
		if (content[i].title.search(searchFilter) !== -1) {
			newSearchData.push({
				...content[i],
				img: images[i],
			});

			searchDataLength =
				searchDataLength == 0 ? searchDataLength++ : searchDataLength;
		}
	}
	console.log(searchFilter == `${/(?:)/i}` ? prevData : searchData[0]);
	return (
		<View>
			<Toolbar
				style={toolbarTheme}
				isSearchActive={isSearchActive}
				leftElement="menu"
				onLeftElementPress={() => navigation.toggleDrawer()}
				centerElement={
					filter == 'Поиск' ? (
						<CustomSearchTitle
							title={
								route.params.title == '"(?:)"'
									? `${translations.all_recipes}`
									: `${route.params.title}`
							}
							resultLength={searchDataLength}
						/>
					) : (
						translations[filter]
					)
				}
				searchable={{
					autoFocus: true,
					placeholder: 'Поиск',
					onSearchPressed: () => {
						setSearchFilter(/(?:)/i);
						changeIsSearchActive(true);
					},
					onChangeText: text => {
						setSearchFilter(new RegExp(text, 'i'));
					},
					onSearchCloseRequested: () => {
						changeIsSearchActive(false);
					},
					onSubmitEditing: () => {
						changeIsSearchActive(false);

						changePrev({
							title:
								searchFilter == `${/(?:)/i}`
									? 'Все рецепты'
									: `${searchFilter}`
											.replace(/\//, '')
											.replace(/\/i/, ''),
							data: newSearchData,
						});

						return navigation.navigate('Поиск', {
							searchData: newSearchData,
							title: `"${searchFilter}"`
								.replace(/\//, '')
								.replace(/\/i/, ''),
							isEmpty: newSearchData == `${[]}`,
							searchDataLength: newSearchData.length,
						});
					},
				}}
			/>
			<FlatList
				style={styles.searchList}
				data={searchFilter == `${/(?:)/i}` ? prevData : searchData}
				renderItem={({ item }) => {
					if (isSearchActive) {
						return (
							<TouchableOpacity
								onPress={() => {
									changeIsSearchActive(false);
									if (item.data == undefined) {
										changePrev({
											title: item.title,
											data: [
												{
													title: item.title,
													img: item.img,
													html: item.html,
												},
											],
										});

										return navigation.navigate('Поиск', {
											searchData: [
												{
													title: item.title,
													img: item.img,
													html: item.html,
												},
											],
											title: `"${item.title}"`,
											isEmpty: false,
											searchDataLength: 1,
										});
									} else {
										changeIsSearchActive(false);
										setSearchFilter(/(?:)/i);

										return navigation.navigate('Поиск', {
											searchData: item.data,
											title: `"${item.title}"`,
											isEmpty: item.data == `${[]}`,
											searchDataLength: item.data.length,
										});
									}
								}}>
								<ListItem
									leftElement={
										/\d{1,3}p/.test(`${item.id}`)
											? 'refresh'
											: 'search'
									}
									style={styles.searchItem}
									centerElement={{
										primaryText: `${item.title}`,
									}}
								/>
							</TouchableOpacity>
						);
					}
				}}
				keyExtractor={item => `${item.id}`}
			/>
		</View>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
