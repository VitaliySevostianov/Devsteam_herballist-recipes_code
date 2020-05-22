import React                                                from 'react'

import { Share,  Text, View, TouchableOpacity }             from 'react-native'

import Icon                                                 from 'react-native-vector-icons/FontAwesome';

import { Dimensions }                                       from 'react-native'

let deviceW = Dimensions.get('window').width
let deviceH = Dimensions.get('window').height
import { getBuildNumber, getVersion }                       from 'react-native-device-info';

import {
  DrawerContentScrollView,
  DrawerItemList,
}                                                           from '@react-navigation/drawer';

import Rate, { AndroidMarket }                              from 'react-native-rate'

const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=mobi.devsteam.recipes',
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

const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} >
        <View style = {{flex: 1, flexDirection: "column", justifyContent: 'space-around', height: deviceH}}>
          <View>
            <DrawerItemList {...props} />
          </View>
          
          <View>
            <TouchableOpacity onPress={()=>{
                const options = {
                    // AppleAppID:"2193813192",
                    GooglePackageName:"mobi.devsteam.recipes",
                    // AmazonPackageName:"com.mywebsite.myapp",
                    OtherAndroidURL:"https://play.google.com/store/apps/details?id=mobi.devsteam.recipes",
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
                <Text style = {{alignSelf: "center", color: 'white', fontSize: 16, marginBottom: 10}}>Оценить приложение</Text>
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
                    Поделиться
                  </Icon.Button>
                </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  }

export default CustomDrawerContent