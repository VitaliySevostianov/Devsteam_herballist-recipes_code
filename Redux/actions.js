import { 
    FILL_PAGE, 
    FILL_IMAGES, 
    FILL_PREV, 
    FILL_PREV_DATE, 
    CHANGE_IS_LATER_DAYS_GONE,
    USER_WANT_RATE,
    UPDATE_LAUNCH_COUNTER
}                                  from './types.js'

export const fillPage = (data) => {
    return {
        type: FILL_PAGE,
        payload: data
    }
}

export const fillImages = (data) => {
    return {
        type: FILL_IMAGES,
        payload: data
    }
}

export const fillPrev = (data) => {
    return {
        type: FILL_PREV,
        payload: data
    }
}

export const fillPrevDate = (data) => {
    return {
        type: FILL_PREV_DATE,
        payload: data
    }
}

export const changeIsLaterDaysGone = (data) => {
    return {
        type: CHANGE_IS_LATER_DAYS_GONE,
        payload: data
    }
}

export const userWantRate = (data) => {
    return {
        type: USER_WANT_RATE,
        payload: data
    }
}

export const updateLaunchCounter = () => {
    return {
        type: UPDATE_LAUNCH_COUNTER,
    }
}