import React, { useState, useEffect }                                                from 'react'

import { Share,  Text, View, TouchableOpacity, Switch }             from 'react-native'

import Icon                                                 from 'react-native-vector-icons/FontAwesome';

import { Dimensions }                                       from 'react-native'


let deviceH = Dimensions.get('window').height
import { getBuildNumber, getVersion, getBundleId }          from 'react-native-device-info';

import {
  DrawerContentScrollView,
  DrawerItemList,
}                                                           from '@react-navigation/drawer';

import Rate, { AndroidMarket }                              from 'react-native-rate'

import { store } from '../Redux/reducers'

import { changeCurrentLang } from '../Redux/actions'

import T from '../../content/translation/i18n'

const onShare = async () => {
    try {
      const result = await Share.share({
        message:
        /* Platform.OS == 'ios' ?  : */`https://play.google.com/store/apps/details?id=${getBundleId()}`,
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  import Main                       	from '../../content/Pages/Main'
import Pancakes                   	from '../../content/Pages/Pancakes'
import Vegetables                 	from '../../content/Pages/Vegetables'
import Potatoes                   	from '../../content/Pages/Potatoes'
import Porridges                  	from '../../content/Pages/Porridges'
import Pasta                      	from '../../content/Pages/Pasta'
import Eggs                       	from '../../content/Pages/Eggs'
import Pizza                      	from '../../content/Pages/Pizza'
  import { createDrawerNavigator }  	from '@react-navigation/drawer'
import { stackComponent }         	from '../functions/stackComponent.js'

  const Drawer = createDrawerNavigator()

export const Draw = () => {
	  console.log(store.getState().currentLang)
	  return(
	  <Drawer.Navigator initialRouteName="Вторые блюда" drawerContent = {(props) => <CustomDrawerContent {...props} />}>
	  <Drawer.Screen name={T("Вторые блюда")}      component={stackComponent(Main)}/>
	  <Drawer.Screen name={T("Блины, оладьи" )}       component={stackComponent(Pancakes)} />
	  <Drawer.Screen name={T("Блюда из овощей" )}     component={stackComponent(Vegetables)} />
	  <Drawer.Screen name={T("Картошечка")}    		  component={stackComponent(Potatoes)} />
	  <Drawer.Screen name={T("Каши" )}                component={stackComponent(Porridges)} />
	  <Drawer.Screen name={T("Макароны, спагетти")}   component={stackComponent(Pasta)} />
	  <Drawer.Screen name={T("Блюда из яиц")}         component={stackComponent(Eggs)} />
	  <Drawer.Screen name={T("Пицца" )}               component={stackComponent(Pizza)} />           
  </Drawer.Navigator>  
	  )
  }
const CustomDrawerContent = (props) => {

	
	let switchState = false
	// if(store.getState().currentLang == 'en'){
	// 	switchState = true
	// }
	const [isEnabled, setIsEnabled] = useState(switchState)
	const toggleSwitch = () => setIsEnabled(prevState => {
		let newLanguage = store.getState().currentLang == 'en' ? 'ru' : 'en'
		store.dispatch(changeCurrentLang(newLanguage))
		return !prevState
	})

    return (
      <DrawerContentScrollView {...props} >
        <View style = {{flex: 1, flexDirection: "column", justifyContent: 'space-around', height: deviceH}}>
			<View>
				<DrawerItemList {...props }/>
			</View>
			
			<View>
             <View style ={{alignSelf: "center", flexDirection: "row"}}>
              	<Text>Ru</Text>
				<Switch 
					onValueChange={toggleSwitch}
					value={isEnabled}
				/>
				<Text>En</Text>
             </View>
            <TouchableOpacity onPress={()=>{
                const options = {
                    // AppleAppID:"2193813192",
                    GooglePackageName: getBundleId(),
                    // AmazonPackageName:"com.mywebsite.myapp",
                    
                    OtherAndroidURL:`https://play.google.com/store/apps/details?id=${getBundleId()}`,
                    preferredAndroidMarket: AndroidMarket.Google,
                    preferInApp:false,
                    openAppStoreIfInAppFails:true,
                    // fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
                }
                Rate.rate(options, success=>{
                    if (success) {
                    // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                    console.log(success)
                    }
                })
                }} 
            >
                <Text style = {{alignSelf: "center", color: 'white', fontSize: 16, marginBottom: 10}}>{T('Оценить приложение')}</Text>
                <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Icon name = "star" size = {25} backgroundColor='rgba(0,0,0,0)' color = 'white' />
                    <Icon name = 'star' size = {25} backgroundColor='rgba(0,0,0,0)' color = 'white'/>
                    <Icon name = 'star' size = {25} backgroundColor='rgba(0,0,0,0)' color = 'white'/>
                    <Icon name = 'star' size = {25} backgroundColor='rgba(0,0,0,0)' color = 'white'/>
                    <Icon name = 'star' size = {25} backgroundColor='rgba(0,0,0,0)' color = 'white'/>
                </View>
            </TouchableOpacity>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text  style = {{color: 'white', marginLeft: 15,}}>ver: {getVersion()}</Text>
                  <Text  style = {{color: 'white', marginLeft: 15,}}>build: {getBuildNumber()}</Text>
                </View>
                <View style ={{marginRight: 15}}>
                  <Icon.Button 
                    name="share" 
                    size = {30} 
                    backgroundColor="#72C0FC" 
                    color="white"
                    onPress = {() => onShare()}
                  >
                    {T('share')}
                  </Icon.Button>
                </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  }

export default CustomDrawerContent