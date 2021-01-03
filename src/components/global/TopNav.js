import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Colors from '../constants/colors';
export default function (props) {	
	return (
		<View  style={styles.container}>
			{/* üst menü  */}
			<View
				style={{
					paddingHorizontal: 20,
					height: 50,
					flexDirection: 'row',
					justifyContent: 'center',
					backgroundColor: '#171D32',
					alignItems: 'center',
					borderColor: '#17202A',
					borderBottomWidth: 1.5,
				}}
			>
				<View
					style={{
						alignItems: 'center',
						flex: 5,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text						
						style={{
							fontWeight:'bold',
							color: Colors.topNavText,
							fontSize: 20,
						}}
					>
						{props.title}
						
					</Text>
				</View>			
			</View>
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