import axios from "axios";
import {REACT_APP_BACKEND} from "@env";

const getFreshProducts = async({pageNumber, pageSize, city}) => {
    try {
        const {data} = await axios.post(`${REACT_APP_BACKEND}/api/product/freshProducts`
        ,{pageSize, pageNumber, city});
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getFreshProducts;