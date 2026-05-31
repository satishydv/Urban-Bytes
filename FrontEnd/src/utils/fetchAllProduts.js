import { BACK_END_API } from "../Constants";
const cachedData = {}

const fetchAllProductSFun = async (IsUpdateProduct) => {
    // IsUpdateProduct means either make new fetch request or not
    try {
        if (cachedData.items && !IsUpdateProduct) {
            return cachedData.items
        }
        const res = await fetch(`${BACK_END_API}/api/products/all`);
        const data = await res.json();
        if (data.success) {
            cachedData.items = data.data;
            return data.data;
        }
    } catch (error) {
        console.groupEnd(error)
        return false;
    }
}

export default fetchAllProductSFun;