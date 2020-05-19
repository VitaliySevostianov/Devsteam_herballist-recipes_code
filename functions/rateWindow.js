import { Alert } from 'react-native'
import { changeIsLaterDaysGone, fillPrevDate, userWantRate } from '../Redux/actions'
import Rate, { AndroidMarket } 								from 'react-native-rate'


export const rateWindow = (dd, mm, store) => {
	
    if(dd - store.getState().prevDate.dd >= 10 || mm - store.getState().prevDate.mm != 0){
      store.dispatch(changeIsLaterDaysGone(true))
    }

	if(store.getState().isLaterDaysGone && store.getState().userWantRate && store.getState().launchCounter % 10 == 0){
    Alert.alert(
	  "Оцените приложение",
	  "Если Вам понравилось приложение, пожалуйста, найдите время, чтобы оценить его. Это не займет больше минуты. Спасибо за вашу поддержку!",
	  [
		{
		  text: "Позже",
		  onPress: () => {
        store.dispatch(changeIsLaterDaysGone(false))
        store.dispatch(fillPrevDate(
        {
        dd: dd,
        mm: mm
      }
      ))},
		  style: "cancel"
		},
		{ 
		  text: "Никогда", 
		  onPress: () => store.dispatch(userWantRate(false)) 
		},
		{ 
		  text: "Оценить",
		  onPress: ()=>{
			const options = {
			  AppleAppID:"2193813192",
			  GooglePackageName:"com.mywebsite.myapp",
			  AmazonPackageName:"com.mywebsite.myapp",
			  OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
			  preferredAndroidMarket: AndroidMarket.Google,
			  preferInApp:false,
			  openAppStoreIfInAppFails:true,
			  fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
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
	  ],
	  { cancelable: false }
    )
	}
}