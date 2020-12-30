import React from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import Text from '../utils/UbuntuFont';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';


export default function (props) {
	const navigationOptions = ({ navigation }) => ({
		title: 'Home',
		headerLeft: () => <MenuImage
		  onPress={() => {
			navigation.openDrawer();
		  }}
		/>
	  });
	return (
		<View>
			
			<View
				style={{
					paddingHorizontal: 20,
					height: 50,
					flexDirection: 'row',
					justifyContent: 'space-between',
					backgroundColor: '#171D32',
					alignItems: 'center',
					borderColor: '#17202A',
					borderBottomWidth: 1.5,
				}}
			>
				{props.withBack ? (
					<TouchableOpacity
						onPress={() => {
							props.navigation.goBack();
						}}
						style={{
							flex: 1,
							alignItems: 'flex-start',
							justifyContent: 'center',
						}}
					>
						<Ionicons name="ios-arrow-back" size={24} color="#000" />
					</TouchableOpacity>
				) : (
					<View style={{ flex: 1, alignItems: 'flex-start' }} />
				)}
				
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
						bold
						style={{
							color: Colors.topNavText,
							fontSize: 20,
						}}
					>
						{props.title}
					</Text>
				</View>
				<View
					style={{
						alignItems: 'flex-end',
						flex: 1,
						justifyContent: 'center',
					}}
				></View>
				
			</View>
		</View>
	);
}
