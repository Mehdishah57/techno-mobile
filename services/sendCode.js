import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_BACKEND } from "@env";
 
const sendCode = async() => {
    try{
        const token = await AsyncStorage.getItem("fyptoken")
        const {data} = await axios.get(
            `${REACT_APP_BACKEND}/api/user/sendCode`,{headers: {"auth-token":token}});
        return [data, null]
    }catch(error){
        return [null, error]
    }
}

export default sendCode;