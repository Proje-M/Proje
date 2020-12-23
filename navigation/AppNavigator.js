import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/colors';
import TabBarIcon from '../components/utils/TabBarIcon';
import TabBarText from '../components/utils/TabBarText';

import Plans from '../screens/Plans';
import Login from '../screens/Login';
import Takvim from '../screens/takvim';
import Profil from '../screens/profil';
import Home from '../screens/Home';
import Register from '../screens/Register'; 
import * as firebase from 'firebase';
import firebaseConfig from '../config';

// import React, { useEffect } from 'react';
// useEffect(() => {
//     LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
// }, [])

const MainStack = createStackNavigator();
const Main = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerMode: 'none',
				headerShown: false,
			}}
		>
			<MainStack.Screen name="MainTabs" component={MainTabs} />
			<MainStack.Screen name="Login" component={Login} />
			<MainStack.Screen name="Register" component={Register} />
			<MainStack.Screen name="Takvim" component={Takvim} />
			<MainStack.Screen name="Profil" component={Profil} />
			<MainStack.Screen name="Home" component={Home} />

		</MainStack.Navigator>
	);
};
const deneme=0;
const Tabs = createBottomTabNavigator();
const MainTabs = () => {
	// state = {
    //     items:[]
    // }

    componentDidMount = () =>{
	console.log('olduuuuuuuu');
		if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
		 }
		//  firebase.database().ref('login').on('value', (snapshot) =>{
		// 	console.log(snapshot.val())
		// 	console.log('bbbebwg')
        //     // console.log('hadiiiiiig');
		// 	// // login: snapshot.val().name
		// 	// this.setState({ login: snapshot.val() })
		//   });
		const myitems = firebase.database().ref("login");
		myitems.on("value",datasnap=>{
			console.log(datasnap.val())
		})
		// firebase.database().ref('login').on('value', snapshot =>{
		// 		let deneme=[];
		// 		this.setState({ items: deneme });
		// 	  });
		  
		//   var ref = firebase.database().ref('login');

        // ref.on("value", function(snapshot) {

        // const userItem = snapshot.val();
		// let items = Object.values(userItem);
		// });
		
      
          firebase.auth().onAuthStateChanged(auth => {
            if(auth) {
              console.log('Giriş Yapıldı.');
            }else{
              console.log('Giriş Yapılmadı.');
            }
          });
    }

   
	if (0) {
            return (
				<Tabs.Navigator
				tabBarOptions={{
					tabStyle: { borderTopWidth: 0 },
					style: { borderTopWidth: 0, borderColor: '#171D32', backgroundColor: '#171D32'},
					activeTintColor: Colors.primary,
				}}
				>
				<Tabs.Screen
					name="Plans"
					component={Plans}
					options={{
						tabBarLabel: ({ focused }) => (
							<TabBarText focused={focused} title="Planlar" />
						),
						tabBarIcon: ({ focused }) => (
							<TabBarIcon focused={focused} icon={'md-home'} />
						),
					}}
				/>
				<Tabs.Screen
					name="Home"
					component={Home}
					options={{
						tabBarLabel: ({ focused }) => (
							<TabBarText focused={focused} title="Listeler" />
						),
						tabBarIcon: ({ focused }) => (
							<TabBarIcon focused={focused} icon={'ios-contact'} />
						),
					}}
				/>
				<Tabs.Screen
					name="Login"
					component={Login}
					options={{
						tabBarLabel: ({ focused }) => (
							<TabBarText focused={focused} title="Profil" />
						),
						tabBarIcon: ({ focused }) => (
							<TabBarIcon focused={focused} icon={'md-person'} />
						),
					}}
				/>
				
			</Tabs.Navigator>
            );
          } else{
			return (
				<Tabs.Navigator
					tabBarOptions={{
						tabStyle: { borderTopWidth: 0 },
						style: { borderTopWidth: 0, borderColor: '#171D32', backgroundColor: '#171D32'},
						activeTintColor: Colors.primary,
					}}
				>
					{/* these icons using Ionicons */}
					<Tabs.Screen
						name="Plans"
						component={Plans}
						options={{
							tabBarLabel: ({ focused }) => (
								<TabBarText focused={focused} title="Planlar" />
							),
							tabBarIcon: ({ focused }) => (
								<TabBarIcon focused={focused} icon={'md-home'} />
							),
						}}
					/>
					<Tabs.Screen
						name="Takvim"
						component={Takvim}
						options={{
							tabBarLabel: ({ focused }) => (
								<TabBarText focused={focused} title="Takvim" />
							),
							tabBarIcon: ({ focused }) => (
								<TabBarIcon focused={focused} icon={'md-person'} />
							),
						}}
					/>
					<Tabs.Screen
						name="Login"
						component={Login}
						options={{
							tabBarLabel: ({ focused }) => (
								<TabBarText focused={focused} title="Giriş Yap/Kayıt Ol" />
							),
							tabBarIcon: ({ focused }) => (
								<TabBarIcon focused={focused} icon={'md-person'} />
							),
						}}
					/>

				</Tabs.Navigator>
				
			);
		  }
	
};

export default () => {
	return (
		<NavigationContainer>
			  <Main />			
		</NavigationContainer>
	);
};
