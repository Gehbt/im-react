/* v8 ignore next 20 */
/* eslint-disable unicorn/prefer-query-selector */
// import React from "react";
// import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createRoot } from "~core/im-react-dom";

const AppName = "app";
const root =
  document.getElementById(AppName) ||
  (() => {
    const div = document.createElement("div");
    div.id = AppName;
    document.body.appendChild(div); // eslint-disable-line unicorn/prefer-dom-node-append
    return div;
  })();
// to html
createRoot(root).render(<App />);
