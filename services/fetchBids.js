import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const fetchBids = async(pageNumber, pageSize, productId) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/bid/get`,{pageNumber, pageSize, productId},{headers:{"auth-token":localStorage.getItem("fyptoken")}})
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default fetchBids;