import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { UserContext } from '../global/UserContext';
import getChat from '../services/getChat';
import MessageItem from '../components/Messages/MessageItem';
import socket from '../socket/socket';
import TouchBox from '../components/TouchBox';
import { Colors, TextInput, TouchableRipple } from 'react-native-paper';
import sendMessage from '../services/sendMessage';
import Loader from '../components/Loader';
import TextField from "../components/TextField";
import Icons from "react-native-vector-icons/Feather";
import { ThemeContext } from '../global/ThemeContext';

const Chat = ({ route, navigation }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user] = useContext(UserContext);
  const [theme] = useContext(ThemeContext);
  const [chat, setChat] = useState({ messages: [] });
  const fetchChat = useRef(null);
  const scrollViewRef = useRef(null);

  fetchChat.current = async () => {
    const [data, error] = await getChat(route.params.id);
    if (error) return;
    else setChat(data);
    let otherUser = data?.idOne?._id?.toString() === user._id ?
      data.idTwo
      : data.idOne;
    navigation.setOptions({
      title: otherUser.name
    })
    setLoading(false);
  }

  socket.off("user-message").on("user-message", data => {
    let temp = [];
    for (let i = 0; i < chat.messages.length; i++) {
      temp.push({ by: chat.messages[i].by, message: chat.messages[i].message })
    }
    temp.push({ by: data.sender, message: data.message });
    setChat({ ...chat, messages: temp });
  })

  useEffect(() => {
    fetchChat.current();
  }, [])

  const handleSubmit = async () => {
    if(!message) return;
    let otherUser = chat.idOne._id.toString() === user._id ? chat.idTwo._id.toString() : chat.idOne._id.toString();
    socket.emit("message", { id: otherUser, message, name: user.name, sender: user._id })
    sendMessage(otherUser, message);
    setMessage("");
  }

  if(loading) return <Loader />
  return (
    <View style={[styles.container, backgroundStyles[theme]]}>
      <ScrollView
        style={styles.chat}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
      >
        {chat.messages.map((message, index) => <MessageItem
          index={index}
          key={index}
          message={message}
          chat={chat}
        />)}
      </ScrollView>
      <View style={styles.btnView}>
        <TextField 
          placeholder="Send your message!"
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity style={styles.btnContainer} onPress={handleSubmit}>
            <Icons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chat: {
    flex: 0.8
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5
  },
  btnContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 70,
    right: 10,
    top: 5,
    backgroundColor: 'black'
  },
  btn: {
    color: 'white'
  },
  input: {
    width: '80%'
  },
  loading: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const backgroundStyles = StyleSheet.create({
	dark: { backgroundColor: 'black' },
	light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
	dark: { color: 'gray' },
	light: { color: 'white' }
})

export default Chat;