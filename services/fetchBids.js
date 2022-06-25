import axios from "axios";
import { REACT_APP_BACKEND } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchBids = async(pageNumber, pageSize, productId) => {
    try {
        const token = await AsyncStorage.getItem("fyptoken")
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/bid/get`,
        {pageNumber, pageSize, productId},{headers:{"auth-token":token}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default fetchBids;