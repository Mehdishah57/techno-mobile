import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { UserContext } from '../global/UserContext';
import getChat from '../services/getChat';
import MessageItem from '../components/Messages/MessageItem';
import socket from '../socket/socket';
import TouchBox from '../components/TouchBox';
import { Colors, TextInput } from 'react-native-paper';
import sendMessage from '../services/sendMessage';
import Loader from '../components/Loader';

const Chat = ({ route, navigation }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user] = useContext(UserContext);
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
    console.log("event recieved and listener fired")
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
    let otherUser = chat.idOne._id.toString() === user._id ? chat.idTwo._id.toString() : chat.idOne._id.toString();
    socket.emit("message", { id: otherUser, message, name: user.name, sender: user._id })
    const [, error] = await sendMessage(otherUser, message);
    if (error) return;
    setMessage("");
  }

  if(loading) return <Loader />
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.chat}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
      >
        {chat.messages.map((message, index) => <MessageItem
          index={index}
          key={message._id}
          message={message}
          chat={chat}
        />)}
      </ScrollView>
      <View style={styles.btnView}>
        <TextInput
          style={styles.input}
          mode="flat"
          label="message"
          value={message}
          onChangeText={text => setMessage(text)}
          theme={{ colors: { text: 'black', primary: 'black', background: 'white' } }}
        />
        <TouchBox onPress={handleSubmit}>
          <View style={styles.btnContainer}>
            <Text style={styles.btn}>Send</Text>
          </View>
        </TouchBox>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  chat: {
    flex: 0.8
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '20%',
    backgroundColor: 'rgb(19, 89, 180)',
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

export default Chat
