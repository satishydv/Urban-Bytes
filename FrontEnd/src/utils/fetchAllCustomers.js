import { BACK_END_API } from "../Constants";

const fetchUsersFun = async (token) => {
    try {
        const res = await fetch(`${BACK_END_API}/api/customers/all`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const result = await res.json();
        if (result.success) {
            return result.data;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default fetchUsersFun;