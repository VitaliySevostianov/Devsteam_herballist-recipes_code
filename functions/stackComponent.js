import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Content from '../Components/Content';
import Search from '../Search';

export const Stack = createStackNavigator();

export const stackComponent = component => () => {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name={'Список'} component={component} />
			<Stack.Screen name={'Контент'} component={Content} />
			<Stack.Screen name={'Поиск'} component={Search} />
		</Stack.Navigator>
	);
};
