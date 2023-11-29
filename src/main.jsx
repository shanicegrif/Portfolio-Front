import React from "react";
import ReactDOM from "react-dom/client";
import { WatchlistProvider } from "./Components/WatchlistContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </React.StrictMode>
);
