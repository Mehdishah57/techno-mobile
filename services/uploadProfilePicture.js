import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const uploadProfilePicture = async(image) => {
    try {
        const { data } = await axios.post(`${REACT_APP_BACKEND}/api/user/uploadImage`,
        image,
        {headers: {"auth-token": localStorage.getItem("fyptoken")}});
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export default uploadProfilePicture;