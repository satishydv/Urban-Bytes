import { BACK_END_API } from "../Constants";

const fetchAllDealsfun = async () => {
    try {
        const res = await fetch(`${BACK_END_API}/api/deals/all`);
        const data = await res.json();
        if (data.success) {
            return data.data;
        } else {
            return false;
        }
    } catch (error) {
        console.groupEnd(error)
        return false;
    }
}

export default fetchAllDealsfun;