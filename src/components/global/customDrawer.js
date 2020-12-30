import React from 'react';
import { ImageBackground, StyleSheet, Image, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import beyaz from '../../../assets/images/nokta.jpeg';
import icon from '../../../assets/icon.png';
function Sidebar({...props}){
    return(
        <View>
			<View style={{justifyContent: 'center', height:200}}>
				<ImageBackground source={beyaz} style={styles.backgroundContainer}/>
 				<Image source={icon} style={styles.drawerImage} />
			</View>
			<View style = {{marginTop:30}}>
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
	}
  });

export  default Sidebar;