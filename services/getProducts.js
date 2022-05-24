import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const getProducts = async({...rest}) => {
    try {
        const { data } = await axios.post(
            `${REACT_APP_BACKEND}/api/product/`,{...rest})
        return [data, null]
    } catch (error) {
        return [error, null]
    }
}

export default getProducts;