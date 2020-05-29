import React from 'react'
import { SafeAreaView }				from 'react-native'



import { NavigationContainer }    	from '@react-navigation/native';


import { MyTheme }                	from './styles'

import { PersistGate }            	from 'redux-persist/integration/react'
import { persistor, store }              	from '../Redux/reducers'



import MyStatusBar 					from './MyStatusBar'	
import Loading						from './Loading'

import {Draw} from '../Components/CustomDrawerContent'


const MainComponent = () => {
    console.log(store.getState().currentLang)
    return(
    <SafeAreaView style = {{flex: 1}}>
        <MyStatusBar />
        <PersistGate loading={<Loading />} persistor={persistor}>
            <NavigationContainer theme = {MyTheme}>
        <Draw></Draw>
            </NavigationContainer>
        </PersistGate>
    </SafeAreaView>
    )
}
export default MainComponent