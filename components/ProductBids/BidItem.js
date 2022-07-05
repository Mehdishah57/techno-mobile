import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../global/ThemeContext'
import { TouchableRipple } from 'react-native-paper'
import { UserContext } from '../../global/UserContext'
import { Swipeable } from 'react-native-gesture-handler'
import DeleteButton from './DeleteButton'
import bidDelete from '../../services/bidDelete'

const BidItem = ({ item, index, deleteBid }) => {
  const [theme] = useContext(ThemeContext);
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const allowDelete = user._id === item.userId || user._id === item.productOwner;

  const handleDelete = async() => {
    setLoading(true)
    console.log(item)
    const [data, error] = await bidDelete({userId: (item.by?._id || null), productId: item.productId});
    if(error) return setLoading(false);
    deleteBid(item._id);
    setLoading(false);
  }

  return (
    <Swipeable renderRightActions={allowDelete? ()=><DeleteButton 
      loading={loading} 
      onPress={handleDelete} /> :null
    }>
      <TouchableRipple onPress={() => { }} style={[styles.main, backgroundStyles[theme]]}>
        <React.Fragment>
          <Text style={[styles.number, textStyles[theme]]}>{index + 1}.</Text>
          {item.userId === user._id ? <Text style={[styles.me, textStyles[theme]]}>Me</Text> : null}
          <Text style={[styles.name, textStyles[theme]]}>{item.by?.name}</Text>
          <Text style={styles.price}>RS: {item.price}</Text>
          <Text style={[styles.date, textStyles[theme]]}>{
            new Date(item.at).toLocaleDateString()
          }</Text>
        </React.Fragment>
      </TouchableRipple>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20
  },
  number: {
    fontSize: 20,
    fontWeight: "bold"
  },
  me: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10
  },
  price: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold"
  },
  date: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 20
  },
  name: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 20
  }
})

const backgroundStyles = StyleSheet.create({
  dark: { backgroundColor: '#333333' },
  light: { backgroundColor: 'white' }
})

const textStyles = StyleSheet.create({
  dark: { color: 'gray' },
  light: { color: 'black' }
})

const borderStyles = StyleSheet.create({
  light: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black'
  }
})

export default BidItem
