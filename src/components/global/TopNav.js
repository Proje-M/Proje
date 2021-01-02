import React from 'react';
import { View,Text } from 'react-native';
import Colors from '../constants/colors';


export default function (props) {	
	return (
		<View>
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
		</View>
	);
}
