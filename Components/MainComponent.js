import React, {useContext} from 'react'
import { SafeAreaView, View }				from 'react-native'


import {stackComponent} from '../functions/stackComponent'
import { NavigationContainer }    	from '@react-navigation/native';


import { MyTheme }                	from './styles'

import { PersistGate }            	from 'redux-persist/integration/react'
import { persistor, store }              	from '../Redux/reducers'



import MyStatusBar 					from './MyStatusBar'	
import Loading						from './Loading'

import CustomDrawerContent from '../Components/CustomDrawerContent'

import { createDrawerNavigator } from '@react-navigation/drawer';

import Main                       	from '../../content/Pages/Main'
import Pancakes                   	from '../../content/Pages/Pancakes'
import Vegetables                 	from '../../content/Pages/Vegetables'
import Potatoes                   	from '../../content/Pages/Potatoes'
import Porridges                  	from '../../content/Pages/Porridges'
import Pasta                      	from '../../content/Pages/Pasta'
import Eggs                       	from '../../content/Pages/Eggs'
import Pizza                      	from '../../content/Pages/Pizza'

import { LocalizationContext } from '../localizationContext'

const Drawer = createDrawerNavigator()
const MainComponent = () => {
    const context = useContext(LocalizationContext)
    console.log(context)
    return(
        <View style = {{flex:1}}>
            <MyStatusBar />
            <PersistGate loading={<Loading />} persistor={persistor}>
                <NavigationContainer theme = {MyTheme}>
                    <Drawer.Navigator initialRouteName = {context.translations.main_dishes} drawerContent = {(props) => <CustomDrawerContent {...props} />}>
                        <Drawer.Screen name={context.translations.main_dishes}      component={stackComponent(Main)}/>
                        <Drawer.Screen name={context.translations.pancakes}       component={stackComponent(Pancakes)} />
                        <Drawer.Screen name={context.translations.vegetables}     component={stackComponent(Vegetables)} />
                        <Drawer.Screen name={context.translations.potatoes}    		  component={stackComponent(Potatoes)} />
                        <Drawer.Screen name={context.translations.porridge}                component={stackComponent(Porridges)} />
                        <Drawer.Screen name={context.translations.macaroni}   component={stackComponent(Pasta)} />
                        <Drawer.Screen name={context.translations.eggs}         component={stackComponent(Eggs)} />
                        <Drawer.Screen name={context.translations.pizza}               component={stackComponent(Pizza)} />  
                    </Drawer.Navigator>
                </NavigationContainer>
            </PersistGate>
        </View>
    )
}
export default MainComponent