import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const signup = async(payload) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/user/signup`,payload);
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default signup;