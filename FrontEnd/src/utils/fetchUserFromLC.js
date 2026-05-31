import { BACK_END_API } from "../Constants"

const fetchUser = async (token) => {
    const res = await fetch(`${BACK_END_API}/api/auth/bytoken`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const result = await res.json();
    if (result.success) {
        return result.data;
    } else {
        return false
    }
}

export default fetchUser;