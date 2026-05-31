import { useEffect } from "react";
import { useSelector } from "react-redux";
import { connectSSE, disconnectSSE } from "../utils/connectToSSE";

const useSSE = ({ onOrderStatus, onNewOrder, AssignOrder } = {}) => {


    // ⚠️ CHECK THIS PATH — must match your Redux store structure
    const user = useSelector((state) => state.user);

    useEffect(() => {

        connectSSE({
            onConnected: () => {
                console.log("✅ useSSE: Ready for", user.email);
            },
            onOrderStatus: (data) => {
                onOrderStatus?.(data);
            },
            onNewOrder: (data) => {
                onNewOrder?.(data);
            },
            onAssignRider: (data) => {
                AssignOrder?.(data);
            }
        });

        return () => {
            console.log("🧹 useSSE: Cleaning up");
            disconnectSSE();
        };
    }, [user?._id]);
};

export default useSSE;