import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const fetchProductyById = async(id) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/api/product/${id}`)
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default fetchProductyById;