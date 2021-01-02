import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/colors';
import TopNav from './TopNav';

export default function (props) {
	return (
		<View style={styles.container}>
			{props.title && (
				<TopNav
					navigation={props.navigation}
					title={props.title}					
					withBack={props.withBack ? true : false}
				/>
			)}
			{/* ubuntu font */}
			{props.children}
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontWeight:'bold',
		flexDirection: 'column',
		backgroundColor: Colors.background, //ana ekran arka plan rengi
	},
});
