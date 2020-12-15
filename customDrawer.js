import React from 'react';
import { ImageBackground, StyleSheet, Image, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import black from './images/black.jpeg';
import logo from './images/logo.png';

function Sidebar({...props}){
    return(
        <View>
			<View style={{justifyContent: 'center', height:200}}>
				<ImageBackground source={black} style={styles.backgroundContainer}/>
 				<Image source={logo} style={styles.drawerImage} />
        		<Text style={styles.imageText}>
           		... Stunning innovations
        		</Text>
			</View>
			<View>
        		<DrawerItems {...props} />
       		</View>
			   
		</View>
    )
   

}
const styles = StyleSheet.create({
	container:{
	  flex:1,
	  alignItems:'center',
	  justifyContent: 'center'
	},

	backgroundContainer:{
	  flex:1,
	  position: 'absolute',
	  top:0,
	  left:0,
	  right:0,
	  bottom:0,
	  alignItems:'center'
	},
	drawerImage:{
	  height:120,
	  width:120,
	  alignSelf:'center'
	},
	imageText:{
	  alignSelf:'center',
	  color: '#fff',
	  padding:10,
	  fontWeight: 'bold',
	  fontStyle: 'italic'
	}
  });

export  default Sidebar;