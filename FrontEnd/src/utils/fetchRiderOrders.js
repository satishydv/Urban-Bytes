import { BACK_END_API } from "../Constants";
import { toast } from "react-toastify";

export const fetchUserOrdersAsRider = async (user) => {

    try {
        const data = await fetch(`${BACK_END_API}/api/orders/rider/me`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });
        const result = await data.json();
        if (result.success) {
            return result.data;
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        return toast.error(error.message);
    }
};
