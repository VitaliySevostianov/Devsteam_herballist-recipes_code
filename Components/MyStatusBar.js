import React from 'react';
import { Dimensions, Platform, View, StatusBar } from 'react-native';

import { styles } from './styles';

const MyStatusBar = () => {
	const isIphoneXorAbove = () => {
		const dimen = Dimensions.get('window');
		return (
			Platform.OS === 'ios' &&
			!Platform.isPad &&
			!Platform.isTVOS &&
			(dimen.height === 812 ||
				dimen.width === 812 ||
				(dimen.height === 896 || dimen.width === 896))
		);
	};
	return (
		<View
			style={
				(styles.statusBar,
				{
					backgroundColor: '#2196f3',
					height:
						Platform.OS === 'ios'
							? isIphoneXorAbove()
								? 44
								: 20
							: 0,
				})
			}>
			<StatusBar barStyle="light-content" backgroundColor="#2196f3" />
		</View>
	);
};
export default MyStatusBar;
