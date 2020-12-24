import React, { useState, Component } from 'react';
import { AppLoading } from 'expo';
import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import { ImageBackground, StyleSheet, Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/AntDesign';
import * as Font from 'expo-font';
import 'moment/locale/id';
import {
	Ubuntu_300Light,
	Ubuntu_300Light_Italic,
	Ubuntu_400Regular,
	Ubuntu_400Regular_Italic,
	Ubuntu_500Medium,
	Ubuntu_500Medium_Italic,
	Ubuntu_700Bold,
	Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';

import Main from './src/navigation/AppNavigator';
import Colors from './src/constants/colors';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Sidebar from './src/components/customDrawer';
import Takvim from './src/screens/takvim'


const CustomDrawerContentComponent = (props)=> (
	<View>
		<Sidebar {...props} />
	</View>
)
const DrawerNavigator =createDrawerNavigator({
	AnaSayfa:{
		screen:Main,
		navigationOptions:{
			drawerIcon: (
				<Icon name="home" size={24} color='#cc5500' />
			),
		}
	},	
	'Günlük Planlar':{
		screen:Main,
		navigationOptions:{
			drawerIcon: (
				<Icon name="plus" size={24} color='#cc5500' />
			),
		}
	},
	Takvim:{
		screen:Takvim,
		navigationOptions:{
			drawerIcon: (
				<Icon name="calendar" size={24} color='#cc5500' />
			),
		}
	},
},{
	initialRouteName: 'AnaSayfa',
	contentComponent: CustomDrawerContentComponent,
	drawerPosition: 'left',
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle' 
})
const App2=createAppContainer(DrawerNavigator);

export default function App(props) {
	
	const [isLoadingComplete, setLoadingComplete] = useState(false);
	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		);
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar
					style="auto"
					translucent
					backgroundColor={Colors.statusBar}>
				</StatusBar>

				<App2 />
			</SafeAreaView>
		);
	}
}


async function loadResourcesAsync() {
	// load all resources such as images, fonts, etc.
	await Promise.all([
		Asset.loadAsync([
			require('./assets/icon.png'),
			require('./assets/splash.png'),
		]),
		Font.loadAsync({
			Ubuntu_300Light,
			Ubuntu_300Light_Italic,
			Ubuntu_400Regular,
			Ubuntu_400Regular_Italic,
			Ubuntu_500Medium,
			Ubuntu_500Medium_Italic,
			Ubuntu_700Bold,
			Ubuntu_700Bold_Italic,
		}),
	]);
}


function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}

const styles = StyleSheet.create({
	container:{
	  flex:1,
	},
});
