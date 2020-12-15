import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';
import Colors from '../constants/colors';
export default function ({ navigation }) {
	return (
		<Layout navigation={navigation}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */}
				<Text bold>This is Profile tab</Text>
				<Text>This tab not using Top navigation</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Login');
					}}
					style={{
						backgroundColor: Colors.primary,
						padding: 10,
						paddingHorizontal: 20,
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: 'white' }} bold>
						Go to second screen
					</Text>
				</TouchableOpacity>
			</View>
		</Layout>
	);
}
