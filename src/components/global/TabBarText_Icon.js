import React from 'react';
import Colors from '../constants/colors';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default (props) => {
	return (
		<Text
			style={{
				fontWeight:'bold',
				marginBottom: 5,
				color: props.focused ? Colors.ActiveTab : Colors.inActiveTab,
				fontSize: 12,
			}}
		>
			{props.title}

		<Ionicons
			name={props.icon}
			style={{ marginTop: -7 }}
			size={25}
			color={props.focused ? Colors.ActiveTab : Colors.inActiveTab}
		/>	
		</Text>
	)		
};
