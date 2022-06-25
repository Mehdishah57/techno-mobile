import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REACT_APP_BACKEND} from "@env";

const bidItem = async(price,productId) => {
    try {
        const token = await AsyncStorage.getItem("fyptoken");
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/bid`,
            {price,productId},
            {headers:{"auth-token": token}})
        return [data, null]
    } catch (error) {
        return [null, error];
    }
}

export default bidItem;