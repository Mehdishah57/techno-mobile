import axios from "axios";
import {REACT_APP_BACKEND} from "@env";

const getLocationData = async() => {
    try {
        const { data } = await axios.get(`${REACT_APP_BACKEND}/api/location`);
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getLocationData;