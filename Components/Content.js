import React, { useContext } from 'react';
import { ScrollView, Image, View, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import { styles, tagsStyles, classesStyles } from './styles';
import { LocalizationContext } from '../localizationContext';

import { isHerbalist } from '../../content/isHerbalist'; //Для отображения дисклеймера в конце статей Приложения Травник
let diclaimerIsNeeded = false;
if (isHerbalist !== undefined) {
	diclaimerIsNeeded = isHerbalist;
}

const Content = ({ route, navigation }) => {
	const { translations } = useContext(LocalizationContext);
	let { html, image, recipeTitle } = route.params;
	if (diclaimerIsNeeded === true) {
		return (
			<View style={{ flex: 1 }}>
				<Toolbar
					leftElement="arrow-back"
					centerElement={recipeTitle}
					onLeftElementPress={() => navigation.pop(1)}
				/>
				<ScrollView style={styles.content}>
					<Image style={styles.bigImage} source={image} />
					<HTML
						html={html}
						ignoredTags={[...IGNORED_TAGS, 'img', 'iframe', 'a']}
						classesStyles={classesStyles}
						tagsStyles={tagsStyles}
					/>
					<Text
						style={{
							color: 'green',
							margin: 10,
							fontWeight: 'bold',
							fontSize: 20,
						}}>
						{translations.disclaimer}
					</Text>
				</ScrollView>
			</View>
		);
	} else if (diclaimerIsNeeded === false) {
		return (
			<View style={{ flex: 1 }}>
				<Toolbar
					leftElement="arrow-back"
					centerElement={recipeTitle}
					onLeftElementPress={() => navigation.pop(1)}
				/>
				<ScrollView style={styles.content}>
					<Image style={styles.bigImage} source={image} />
					<HTML
						html={html}
						ignoredTags={[...IGNORED_TAGS, 'img', 'iframe', 'a']}
						classesStyles={classesStyles}
						tagsStyles={tagsStyles}
					/>
				</ScrollView>
			</View>
		);
	}
};

export default Content;
