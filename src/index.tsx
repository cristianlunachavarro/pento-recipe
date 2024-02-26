import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { MealsProvider } from "./context/meals";
import { InputsProvider } from ".//context/inputs"

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MealsProvider>
      <InputsProvider>
        <App />
      </InputsProvider>
    </MealsProvider>
  </React.StrictMode>
);

reportWebVitals();
