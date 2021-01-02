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
import Search from  './src/screens/api';


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
		  });
	  } catch (e) {
	  }
  
	}
	render() {
		return (<App2 />);
	}
}

export default function App(props) {	
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


