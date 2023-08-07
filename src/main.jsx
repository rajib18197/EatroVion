import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "../index.css";
import App from "./App";
import ShortUrl from "./ShortUrl";
// import AppPractice from "./App-Practice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <ShortUrl /> */}
    {/* <AppPractice /> */}
  </React.StrictMode>
);
