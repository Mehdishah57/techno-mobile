import axios from "axios";
import { REACT_APP_BACKEND } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const removeFromFav = async(productId) => {
    try {
        const token = await AsyncStorage.getItem("fyptoken")
        const {data} = await axios.patch(
            `${REACT_APP_BACKEND}/api/product/removeFavourites`,{productId},{headers:
                { "auth-token": token }})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default removeFromFav;