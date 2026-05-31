import { useState } from "react";
import { createContext } from "react";

const UserStatusContext = createContext(null);

const UseUserStatusProvider = ({ children }) => {
  // This is where you would implement any logic to determine the user's status
  const [orderStatus, setOrderStatus] = useState([]);
    const [riderOrders, setRiderOrders] = useState([]);
  return (
    <UserStatusContext.Provider value={{ orderStatus, setOrderStatus, riderOrders, setRiderOrders }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export { UseUserStatusProvider,UserStatusContext };
