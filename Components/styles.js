import { Dimensions, StyleSheet } from 'react-native';

let deviceW = Dimensions.get('window').width;
let deviceH = Dimensions.get('window').height;

const mainColor = '#72C0FC';
const secondaryColor = '#2196f3';
const activeColor = '#075795';
const textColor = 'white';
const borderColor = '#B1DBFC';

// style = {{container: {backgroundColor: 'green'}}} // Toolbar styling

export const tagsStyles = {
	div: {
		color: textColor,
		margin: 10,
	},
	p: {
		color: textColor,
		margin: 10,
	},
	h1: {
		color: textColor,
		margin: 10,
	},
	h2: {
		color: textColor,
		margin: 10,
	},
	li: {
		color: textColor,
	},
	ol: {
		color: textColor,
	},
};

export const classesStyles = {
	'text-right': {
		marginLeft: 10,
	},
	quote: {
		margin: 0,
	},
	// 'full-news-content':{
	//     margin: 0
	// },
	// 'news-item-content':{
	//     margin: 0
	// }
};

export const MyTheme = {
	dark: false,
	colors: {
		primary: activeColor,
		card: mainColor,
		text: textColor,
	},
};
export const styles = StyleSheet.create({
	toolbarAbsolutePosition: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	contentListAbsolutePosition: {
		position: 'absolute',
		top: 50,
		bottom: 0,
		left: 0,
		right: 0,
	},

	safeArea: {
		flex: 1,
		backgroundColor: secondaryColor,
	},
	adContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: mainColor,
	},
	customSearchTitle: {
		color: 'white',
		fontSize: 20,
		textAlign: 'left',
	},
	customSearchTitleSecondLine: {
		color: 'white',
	},
	loadingScreen: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: secondaryColor,
		justifyContent: 'center',
	},
	loadingText: {
		alignSelf: 'center',
		color: textColor,
		fontSize: 24,
	},
	statusBar: {
		backgroundColor: secondaryColor,
	},
	searchList: {
		alignSelf: 'center',
		minHeight: 0,
		maxHeight: deviceH,
		zIndex: 10,
		width: deviceW - 20,
		maxWidth: deviceH,
		backgroundColor: mainColor,
	},
	itemList: {
		backgroundColor: mainColor,
	},
	searchItem: {
		height: 40,
		zIndex: 10,
	},
	card: {
		flexDirection: 'row',
		borderColor: borderColor,
		backgroundColor: mainColor,
		borderBottomWidth: 2,
	},
	cardText: {
		flex: 1,
		alignSelf: 'center',
		// textAlign: "center",
		fontSize: 20,
		// fontWeight: 'bold',
		color: textColor,
	},
	notFoundCard: {
		height: deviceH,
		flexDirection: 'row',
		borderColor: borderColor,
		backgroundColor: mainColor,
		borderBottomWidth: 2,
	},
	notFoundText: {
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		color: textColor,
	},
	content: {
		backgroundColor: mainColor,
	},
	smallImage: {
		alignSelf: 'center',
		height: 120,
		width: 160,
		borderRadius: 5,
		margin: 10,
	},
	bigImage: {
		alignSelf: 'center',
	},
});
