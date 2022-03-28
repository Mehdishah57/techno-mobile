import axios from "axios";

const login = async (email, password) => {
    try {
        const { data } = await axios.post(`http://192.168.18.4:3500/api/user/login`, { email, password })
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default login;