import {
	FILL_PAGE,
	FILL_IMAGES,
	FILL_PREV,
	FILL_PREV_DATE,
	CHANGE_IS_LATER_DAYS_GONE,
	USER_WANT_RATE,
	UPDATE_LAUNCH_COUNTER,
} from './types.js';

const fillPage = data => {
	return {
		type: FILL_PAGE,
		payload: data,
	};
};

const fillImages = data => {
	return {
		type: FILL_IMAGES,
		payload: data,
	};
};

const fillPrev = data => {
	return {
		type: FILL_PREV,
		payload: data,
	};
};

const fillPrevDate = data => {
	return {
		type: FILL_PREV_DATE,
		payload: data,
	};
};

const changeIsLaterDaysGone = data => {
	return {
		type: CHANGE_IS_LATER_DAYS_GONE,
		payload: data,
	};
};

const userWantRate = data => {
	return {
		type: USER_WANT_RATE,
		payload: data,
	};
};

const updateLaunchCounter = data => {
	return {
		type: UPDATE_LAUNCH_COUNTER,
		payload: data,
	};
};

export {
	fillPage,
	fillImages,
	fillPrev,
	fillPrevDate,
	changeIsLaterDaysGone,
	userWantRate,
	updateLaunchCounter,
};
