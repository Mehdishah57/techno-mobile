import axios from "axios";
import { REACT_APP_BACKEND } from "@env";

const addToFav = async(productId) => {
    try{
        const { data } = await axios
        .patch(`${REACT_APP_BACKEND}/api/product/favourites`,{productId},{headers: {"auth-token": localStorage.getItem("fyptoken")}})
        return [data, null]
    }catch(error){
        return [null, error]
    }
}

export default addToFav;