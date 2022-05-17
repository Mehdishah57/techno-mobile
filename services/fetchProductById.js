import axios from "axios";

const fetchProductyById = async(id) => {
    try {
        const { data } = await axios.get(`http://192.168.18.4:3500/api/product/${id}`)
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default fetchProductyById;