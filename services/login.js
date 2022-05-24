import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const login = async (email, password) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/user/login`, { email, password })
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default login;