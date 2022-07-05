import axios from "axios";
import { REACT_APP_BACKEND } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const verify = async(code) => {
    try{
        const token = await AsyncStorage.getItem("fyptoken")
        const {data} = await axios.post(
            `${REACT_APP_BACKEND}/api/user/verify`,
            {code},{headers: {"auth-token":token}});
        return [data, null]
    }catch(error){
        return [null, error];
    }
}

export default verify;