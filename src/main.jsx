/* eslint-disable unicorn/prefer-query-selector */
// import React from "react";
// import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import IMReactDOM from "~core/im-react-dom";

const root =
  document.getElementById("root") ||
  (() => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div); // eslint-disable-line unicorn/prefer-dom-node-append
    return div;
  })();
// to html
IMReactDOM.createRoot(root).render(<App />);
