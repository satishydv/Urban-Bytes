import { BACK_END_API } from "../Constants";

let eventSource = null;
let reconnectTimer = null;

export const connectSSE = (handlers) => {
    // Clear any pending reconnect
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }

    // Close existing connection
    if (eventSource) {
        eventSource.close();
        eventSource = null;
    }

    // ⚠️ CHECK THIS KEY — must match what your login action saves
    const token = localStorage.getItem("PPCUserToken");

    if (!token) {
        console.error("❌ SSE: No token in localStorage. Key checked: PPCUserToken");
        console.log("📦 All localStorage keys:", Object.keys(localStorage));
        return;
    }

    const url = `${BACK_END_API}/api/sse?token=${token}`;
    console.log("🔌 SSE: Connecting to", url);

    eventSource = new EventSource(url);

    eventSource.onopen = () => {
        console.log("🟢 SSE: Connection opened (readyState:", eventSource.readyState, ")");
    };

    eventSource.addEventListener("connected", (e) => {
        console.log("✅ SSE: Server confirmed connection:", e.data);
        handlers?.onConnected?.();
    });

    eventSource.addEventListener("order_status", (e) => {
        console.log("📦 SSE: order_status event:", e.data);
        handlers?.onOrderStatus?.(JSON.parse(e.data));
    });

    eventSource.addEventListener("order_assigned", (e) => {
        console.log("Rider  Is assigned", e.data);
        handlers?.onAssignRider?.(JSON.parse(e.data))
    })

    eventSource.addEventListener("new_order", (e) => {
        console.log("🛒 SSE: new_order event:", e.data);
        handlers?.onNewOrder?.(JSON.parse(e.data));
    });

    eventSource.onerror = () => {
        console.error("❌ SSE Error. readyState:", eventSource.readyState);
        // readyState: 0=CONNECTING, 1=OPEN, 2=CLOSED
        // If it immediately goes to 2, backend is rejecting the connection
        if (eventSource.readyState === EventSource.CLOSED) {
            console.log("🔄 SSE: Reconnecting in 5 seconds...");
            eventSource.close();
            eventSource = null;
            reconnectTimer = setTimeout(() => connectSSE(handlers), 5000);
        }
    };
};

export const disconnectSSE = () => {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }
    if (eventSource) {
        eventSource.close();
        eventSource = null;
        console.log("🔴 SSE: Disconnected");
    }
};