import React, { useState, useContext, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dialog, Portal, Provider, TextInput, TouchableRipple } from 'react-native-paper';
import { ThemeContext } from '../global/ThemeContext';
import { UserContext } from '../global/UserContext';
import sendMessage from '../services/sendMessage';
import socket from '../socket/socket';

const MessageDialog = ({ visible, setVisible, product }) => {
	const [text, setText] = useState("");
	const [theme] = useContext(ThemeContext);
	const [user] = useContext(UserContext);

	const fieldTheme = useMemo(() => ({
		colors: {
			text: textStyles[theme].color,
			placeholder: textStyles[theme].color,
			primary: textStyles[theme].color
		}
	}), [theme])

	const hideDialog = () => {
		setVisible(false);
		setText("");
	}

	const handleSend = async() => {
		if(!text) return hideDialog();
		socket.emit("message", { id: product.owner?._id, message: text, name: user.name, sender: user._id })
		sendMessage(product.owner?._id, text);
		hideDialog();
	}

	return (
		<Provider>
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>Message {product.owner?.name}</Dialog.Title>
					<Dialog.Content>
						<TextInput
							mode='flat'
							label="Message"
							value={text}
							onChangeText={text => setText(text)}
							theme={fieldTheme}
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<TouchableRipple onPress={hideDialog}>
							<View style={[styles.btn]}>
								<Text style={[styles.text,textStyles[theme]]}>Cancel</Text>
							</View>
						</TouchableRipple>
						<TouchableRipple onPress={handleSend}>
							<View style={[styles.btn]}>
								<Text style={[styles.text,textStyles[theme]]}>Send</Text>
							</View>
						</TouchableRipple>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</Provider>
	);
};

const styles = StyleSheet.create({
	btn: {
		padding: 10,
		borderRadius: 10
	},
	bgBlue: {
		backgroundColor: 'dodgerblue',
		borderRadius: 10
	}
})

const backgroundStyles = StyleSheet.create({
	dark: { backgroundColor: 'black' },
	light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
	dark: { color: 'white' },
	light: { color: 'black' }
})

export default MessageDialog;