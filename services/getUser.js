import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const getUser = async (email) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/user/getByEmail`,{email});
        return { data, error:null }
    } catch (error) {
        return { data:null, error }        
    }
} 

export default getUser;