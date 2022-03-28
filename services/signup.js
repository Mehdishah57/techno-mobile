import axios from "axios";

const signup = async(payload) => {
    try {
        const { data } = await axios.post(`http://192.168.18.4:3500/api/user/signup`,payload);
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default signup;