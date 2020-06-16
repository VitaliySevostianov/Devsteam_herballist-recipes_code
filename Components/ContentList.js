import React, { useEffect, useContext } from 'react';

import {
	Text,
	FlatList,
	View,
	Image,
	TouchableOpacity,
	BackHandler,
	Alert,
	Platform,
} from 'react-native';

import { connect } from 'react-redux';

import { imagesData } from '../../android/app/src/main/assets/images/photos/index';

import { styles } from './styles';

import { AdMobBanner } from 'react-native-admob';

import Rate, { AndroidMarket } from 'react-native-rate';
import { useIsFocused } from '@react-navigation/native';
import { getBundleId } from 'react-native-device-info';

import { AppleAppId } from '../../content/linkToAppStore'

import { LocalizationContext } from '../localizationContext';

const mapStateToProps = state => {
	return {
		content: state.content,
		images: state.images,
	};
};

const ContentList = ({ filter, content, images, navigation }) => {
	const { translations, appLanguage } = useContext(LocalizationContext);
	const isFocused = useIsFocused();
	useEffect(() => {
		if (isFocused) {
			const backAction = () => {
				Alert.alert(
					translations.exit,
					translations.exit_message,
					[
						{
							text: translations.cancel,
							onPress: () => null,
							style: 'cancel',
						},
						{
							text: translations.rate_us,
							onPress: () => {
								const options = {
									AppleAppID: AppleAppId,
									GooglePackageName: getBundleId(),
									// AmazonPackageName:"com.mywebsite.myapp",
									OtherAndroidURL: `https://play.google.com/store/apps/details?id=${getBundleId()}`,
									preferredAndroidMarket:
										AndroidMarket.Google,
									preferInApp: false,
									openAppStoreIfInAppFails: true,
									// fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
								};
								Rate.rate(options, success => {
									if (success) {
										// this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
										console.log(success);
									}
								});
							},
							style: 'cancel',
						},
						{
							text: translations.exit_out,
							onPress: () => BackHandler.exitApp(),
						},
					],
					{ cancelable: true },
				);
				return true;
			};
			const backHandler = BackHandler.addEventListener(
				'hardwareBackPress',
				backAction,
			);

			return () => backHandler.remove();
		}
	});

	filter = translations[filter];
	// console.log(section)
	const section = new RegExp(filter);
	let data = [];
	let enStartLength =
		content.length % 2 != 0
			? Math.floor(content.length / 2) - 2
			: content.length / 2;
	if (appLanguage == 'en') {
		data = [];
		for (let i = enStartLength; i < content.length; i++) {
			if (section.test(content[i].section)) {
				data.push({
					...content[i],
					img: images[i],
				});
			}
		}
	} else if (appLanguage == 'ru') {
		data = [];
		for (let i = 0; i < content.length / 2; i++) {
			if (section.test(content[i].section)) {
				data.push({
					...content[i],
					img: images[i],
				});
			}
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={styles.itemList}
				data={data}
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
};

export default connect(mapStateToProps)(ContentList);
