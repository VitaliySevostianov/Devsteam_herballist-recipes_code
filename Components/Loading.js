import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { styles } from './styles';

const Loading = () => {
	return (
		<View style={styles.loadingScreen}>
			<ActivityIndicator size={100} color="#0ffa02" />
		</View>
	);
};
export default Loading;
