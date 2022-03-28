import axios from "axios";

const refreshUser = async (token) => {
    try {
        const { data } = await axios.get(`http://192.168.18.4:3500/api/user/`,{headers: {"auth-token": token}})
        return [data, null]
    } catch (error) {
        return [error, null]
    }
}

export default refreshUser;