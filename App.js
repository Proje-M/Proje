import React, { useState, Component } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/AntDesign';
import * as Font from 'expo-font';
//import 'moment/locale/id';
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
import Colors from './src/components/constants/colors';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Sidebar from './src/components/global/customDrawer';
import Search from  './src/screens/api';

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
		screen:Search,
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

class MainAppContainer extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		role: '',
	  }
	  this.arrayholder = [];
	  this.navigation = props.navigation;
	}
  
	componentDidMount() {
	  try {
		const { email } = firebase.auth().currentUser;
		const ref = firebase
		  .database()
		  .ref('/users')
		  .orderByChild('email')
		  .equalTo(email)
		  .once('value').then(snapshot => {
			let data;
			snapshot.forEach((childSub) => {
			  let key = childSub.key;
			  let childData = childSub.val();
			  data = childData.role;
			});
			this.setState({ role: data });
			console.log(this.state.role)
			//.log('User data: ', snapshot.val());
		  });
	  } catch (e) {
		//this.setState({ role: "admin" });
	  }
  
	}
	render() {
		return (<App2 />);
	}
}

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

				<MainAppContainer></MainAppContainer>
			</SafeAreaView>
		);
	}
}


async function loadResourcesAsync() {
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
