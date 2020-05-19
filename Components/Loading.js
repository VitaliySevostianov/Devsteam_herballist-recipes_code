import React from 'react'
import { Text,  View } from 'react-native'

import { styles } from './styles'

const Loading = () => {

    return(
        <View style = {styles.loadingScreen}>
            <Text style = {styles.loadingText}>Загрузка...</Text>
        </View>
    )
}
export default Loading