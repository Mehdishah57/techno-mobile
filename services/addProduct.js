import axios from "axios";
import { REACT_APP_BACKEND } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addProduct = async(payload) => {
    try {
        const token = await AsyncStorage.getItem("fyptoken")
        const { data } = await axios.post(
            `${REACT_APP_BACKEND}/api/product/add`
            ,payload,{headers: {"auth-token": token}});
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export default addProduct;