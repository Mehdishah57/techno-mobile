import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const sendCodeToPhone = async(method,phoneNumber,countryCode, email) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/user/forgotPassword`,{method,phoneNumber,countryCode,email})
        return { data, error:null}
    } catch (error) {
        return { data:null, error }
    }
}

export default sendCodeToPhone;