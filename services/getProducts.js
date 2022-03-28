import axios from "axios";

const getProducts = async({...rest}) => {
    try {
        const { data } = await axios.post(
            `http://192.168.18.4:3500/api/product/`,{...rest})
        return [data, null]
    } catch (error) {
        return [error, null]
    }
}

export default getProducts;