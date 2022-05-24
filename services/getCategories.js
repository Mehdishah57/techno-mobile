import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const getCategories = async() => {
    try {
        const {data} = await axios.get(`${REACT_APP_BACKEND}/api/category`,{headers: {"auth-token":localStorage.getItem("fyptoken")}});
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export default getCategories;