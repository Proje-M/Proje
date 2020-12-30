import React from 'react';
import Colors from '../constants/colors';
import Text from './UbuntuFont';
export default (props) => {
	return (
		<Text
			bold
			style={{
				marginBottom: 5,
				color: props.focused ? Colors.ActiveTab : Colors.inActiveTab,
				fontSize: 11,
			}}
		>
			{props.title}
		</Text>
	);
};
