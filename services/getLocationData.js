import axios from "axios";
import {REACT_APP_BACKEND} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getCachedCities = async () => {
    try {
        const cityString = await AsyncStorage.getItem("city");
        const cities = JSON.parse(cityString);
        return cities
    } catch (error) {
        return null;
    }
}

const getLocationData = async() => {
    try {
        const cachedCities = await getCachedCities();
        if(cachedCities) return [cachedCities, null];
        const { data } = await axios.get(`${REACT_APP_BACKEND}/api/location`);
        const cityString = JSON.stringify(data);
        await AsyncStorage.setItem("city",cityString);
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default getLocationData;