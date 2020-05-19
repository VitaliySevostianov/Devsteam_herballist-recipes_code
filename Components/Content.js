import React 						from "react"
import { ScrollView, Image } 	from "react-native"
import { Toolbar } 					from 'react-native-material-ui';
import HTML 						from 'react-native-render-html';
import { IGNORED_TAGS } 			from 'react-native-render-html/src/HTMLUtils';
import {styles, tagsStyles, classesStyles } 		from './styles'

const Content = ({route, navigation}) => {
		let {html, image, recipeTitle} = route.params

		return(
			<ScrollView style = {styles.content}>
				<Toolbar
					leftElement="arrow-back"
					centerElement={recipeTitle}
					onLeftElementPress ={() => navigation.pop(1)}
				/>
				<Image style = {styles.bigImage} source = {image} />
				<HTML html={html} ignoredTags={[...IGNORED_TAGS, 'img']} classesStyles = {classesStyles} tagsStyles = {tagsStyles} />
			</ScrollView>
		)
};

export default Content
