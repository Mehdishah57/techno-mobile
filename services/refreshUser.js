import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const refreshUser = async (token) => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/api/user/`,{headers: {"auth-token": token}})
        return [data, null]
    } catch (error) {
        return [error, null]
    }
}

export default refreshUser;