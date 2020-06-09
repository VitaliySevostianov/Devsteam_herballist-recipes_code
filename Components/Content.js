import React from 'react';
import { ScrollView, Image, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import { styles, tagsStyles, classesStyles } from './styles';

const Content = ({ route, navigation }) => {
	let { html, image, recipeTitle } = route.params;

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
};

export default Content;
