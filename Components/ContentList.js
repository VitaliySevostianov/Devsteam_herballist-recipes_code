import React,	{useEffect}									from "react"

import { 
	Text, 
	FlatList, 
	View, 
	Image, 
	TouchableOpacity, 
	BackHandler, 
	Alert,
	Platform
} 															from "react-native"

import { connect } 											from 'react-redux'

import { imagesData } 										from '../../android/app/src/main/assets/images/photos/index'

import { styles } 											from './styles'

import { AdMobBanner } 										from 'react-native-admob'

import Rate, { AndroidMarket } 								from 'react-native-rate'
import { useIsFocused } 									from "@react-navigation/native"
import { getBundleId }          							from 'react-native-device-info';


const mapStateToProps = (state) => {
	return{
	  content: state.content,
	  images: state.images
	}
  }

const ContentList = ({filter, content, images, navigation}) => {
	const isFocused = useIsFocused();
	useEffect(() => {
		if(isFocused){
		const backAction = () => {
			Alert.alert(
				"Выход",
				"Не хотите оценить приложение перед выходом?",
				[
					{
					text: "Отмена",
					onPress: () => null,
					style: "cancel"
					},
					{
					text: "Оценить",
					onPress: ()=>{
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
						},
					style: "cancel"
					},
					{ text: "Выйти", onPress: () => BackHandler.exitApp() }
				],
				{ cancelable: true }
			);
			return true
		}
		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
	
		return () => backHandler.remove()
	}
	})
	



	const section = new RegExp(filter)
	let data = []
	for(let i = 0; i < content.length; i++){
		if(section.test(content[i].section)){
			data.push({
				...content[i],
				img: images[i]
			})
		}
	}
	
	return(
		<View style ={{flex: 1}}>
			<FlatList
				style = {styles.itemList}
				data = {data}
				renderItem = {({item}) => {
				return(
					<View >
						<TouchableOpacity 
							style = {styles.card} 
							onPress = {() => {return navigation.navigate('Контент', {
								html: item.html,
								recipeTitle: item.title,
								image: imagesData[item.img]
							})}}
						>
							<Image 
								style = {styles.smallImage} 
								source={imagesData[item.img]}
							/>
							<Text style = {styles.cardText}>
								{item.title}
							</Text>
						</TouchableOpacity>
					</View>
					)
				}}
				keyExtractor={item => `${item.id}`}
			>
			</FlatList>
			<View style = {styles.adContainer}>
				<AdMobBanner
					adSize="SMART_BANNER"
					adUnitID= {Platform.OS == 'ios' ? "ca-app-pub-8323348147242911/9664734587" : "ca-app-pub-8323348147242911/7178172049"}
					testDevices={[AdMobBanner.simulatorId]}
					onAdFailedToLoad={error => console.error(error)}
				/>
			</View>
		</View>
	)
};

export default connect(mapStateToProps)(ContentList)