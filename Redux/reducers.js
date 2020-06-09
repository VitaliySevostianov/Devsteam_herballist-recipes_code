import { createStore } from 'redux';
import {
	FILL_PAGE,
	FILL_IMAGES,
	FILL_PREV,
	FILL_PREV_DATE,
	CHANGE_IS_LATER_DAYS_GONE,
	USER_WANT_RATE,
	UPDATE_LAUNCH_COUNTER,
} from './types.js';

import AsyncStorage from '@react-native-community/async-storage';

import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: [
		'prev',
		'prevDate',
		'isLaterDaysGone',
		'userWantRate',
		'images',
		'launchCounter',
	],
};

const initialState = {
	content: {},
	images: {},
	prev: [],
	prevDate: {},
	isLaterDaysGone: true,
	userWantRate: true,
	launchCounter: 0,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FILL_PAGE:
			return {
				...state,
				content: action.payload,
			};
		case FILL_IMAGES:
			return {
				...state,
				images: action.payload,
			};
		case FILL_PREV:
			return {
				...state,
				prev:
					state.prev.length < 3
						? [...state.prev, action.payload]
						: [
								state.prev[1],
								state.prev[2],
								(state.prev[0] = action.payload),
						  ],
			};
		case FILL_PREV_DATE:
			return {
				...state,
				prevDate: {
					...state.prevDate,
					dd: action.payload.dd,
					mm: action.payload.mm,
				},
			};
		case CHANGE_IS_LATER_DAYS_GONE:
			return {
				...state,
				isLaterDaysGone: action.payload,
			};
		case USER_WANT_RATE:
			return {
				...state,
				userWantRate: action.payload,
			};
		case UPDATE_LAUNCH_COUNTER:
			return {
				...state,
				launchCounter: action.payload,
			};
		default:
			return state;
	}
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
