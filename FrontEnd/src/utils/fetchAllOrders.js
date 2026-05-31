/* eslint-disable no-unused-vars */
import { BACK_END_API } from "../Constants"

const fetchAllOrderfun = async (token) => {
    try {
        const res = await fetch(`${BACK_END_API}/api/orders/all`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (data.success) {
            return data.data;
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export default fetchAllOrderfun;