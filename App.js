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
import AppNavigator from './navigation/AppNavigator';
import Main from './navigation/AppNavigator';
import Colors from './constants/colors';
import Login from './screens/Login';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import black from './images/black.jpeg';
import logo from './images/logo.png';
import Sidebar from './components/customDrawer';
import * as Permissions from 'expo-permissions';
import TodoStore from './data/TodoStore';
import Home from './screens/Home';
import deneme12 from './screens/deneme12'
import CreateTask from './screens/CreateTask';
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
				// <Icon name="bars" size={30} color="#cc5500" onPress={()=>this.props.navigation.closeDrawer()} />
			),
		}
	},	
	'Günlük Planlar':{
		screen:Login,
		navigationOptions:{
			drawerIcon: (
				<Icon name="plus" size={24} color='#cc5500' />
				
			),
		}
	},
	Takvim:{
		screen:deneme12,
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
				{/* <AppNavigator /> */}
			</SafeAreaView>
		);
	}
}

const ApppNavigator = createStackNavigator(
	{
	  Home,
	  CreateTask,
	},
	{
	  headerMode: 'none',
	}
  );
  
  const ApppContainer = createAppContainer(ApppNavigator);

class Appp extends Component {
	async componentDidMount() {
	  await this._askForCalendarPermissions();
	  await this._askForReminderPermissions();
	}
  
	_askForCalendarPermissions = async () => {
	  await Permissions.askAsync(Permissions.CALENDAR);
	};
  
	_askForReminderPermissions = async () => {
	  if (Platform.OS === 'android') {
		return true;
	  }
  
	  await Permissions.askAsync(Permissions.REMINDERS);
	};
  
	render() {
	  return (
		<TodoStore>
		  <ApppContainer />
		</TodoStore>
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
