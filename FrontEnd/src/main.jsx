/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { UseUserStatusProvider } from "./store/contextStore/userUserStatus";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <UseUserStatusProvider>
        <App />
        <ToastContainer
          closeButton={true}
          position="bottom-right"
          autoClose={4000}
        />
      </UseUserStatusProvider>
    </BrowserRouter>
  </Provider>,
);
