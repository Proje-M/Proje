import React, { Component } from 'react';
import {  View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/AntDesign';
import Main from './src/navigation/AppNavigator';
import Colors from './src/components/constants/colors';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Sidebar from './src/components/global/customDrawer';
import Api from  './src/screens/api';


console.disableYellowBox = true;
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
				<Icon name="home" size={24} color='#483D8B' />
			),
		}
	},	
	Keşfet:{
		screen:Api,
		navigationOptions:{
			drawerIcon: (
				<Icon name="book" size={24} color='#483D8B' />
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


