import axios from "axios";
import { REACT_APP_BACKEND } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getLists = async() => {
    try {
        const token = await AsyncStorage.getItem("fyptoken")
        const {data} = await axios.get(`${REACT_APP_BACKEND}/api/message/getList`
        ,{headers:{"auth-token":token}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getLists;