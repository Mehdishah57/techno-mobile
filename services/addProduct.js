import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const addProduct = async(payload) => {
    try {
        const { data } = await axios.post(
            `${REACT_APP_BACKEND}/api/product/add`
            ,payload,{headers: {"auth-token": localStorage.getItem("fyptoken")}});
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export default addProduct;