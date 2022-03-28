import axios from "axios";

const getMyAds = async() => {
    try {
        const {data} = await axios.get(
            `${process.env.REACT_APP_BACKEND}/api/product/myads`
            ,{headers: {"auth-token":localStorage.getItem("fyptoken")}});
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

export default getMyAds;