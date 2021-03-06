import { Alert } from 'react-native';
import {
	changeIsLaterDaysGone,
	fillPrevDate,
	userWantRate,
	updateLaunchCounter,
} from '../Redux/actions';
import Rate, { AndroidMarket } from 'react-native-rate';

import { AppleAppId } from '../../content/linkToAppStore'

import { getBundleId } from 'react-native-device-info';

export const rateWindow = (dd, mm, store, translations) => {
	let launchCounter = store.getState().launchCounter + 1;
	console.log(launchCounter);
	store.dispatch(updateLaunchCounter(launchCounter));
	if (
		dd - store.getState().prevDate.dd >= 10 ||
		mm - store.getState().prevDate.mm != 0
	) {
		store.dispatch(changeIsLaterDaysGone(true));
	}

	if (
		store.getState().isLaterDaysGone &&
		store.getState().userWantRate &&
		store.getState().launchCounter % 10 == 0
	) {
		Alert.alert(
			translations.rate_app,
			translations.rate_message,
			[
				{
					text: translations.later,
					onPress: () => {
						store.dispatch(changeIsLaterDaysGone(false));
						store.dispatch(
							fillPrevDate({
								dd: dd,
								mm: mm,
							}),
						);
					},
					style: 'cancel',
				},
				{
					text: translations.never,
					onPress: () => store.dispatch(userWantRate(false)),
				},
				{
					text: translations.rate_us,
					onPress: () => {
						const options = {
							AppleAppID: AppleAppId,
							GooglePackageName: getBundleId(),

							OtherAndroidURL: `https://play.google.com/store/apps/details?id=${getBundleId()}`,
							preferredAndroidMarket: AndroidMarket.Google,
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
			],
			{ cancelable: false },
		);
	}
};
