import App from "./App";
import { IMReactDOM } from "~core/im-react-dom";

const root =
  document.getElementById("root") ||
  (() => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div)
    return div;
  })();
IMReactDOM.createRoot(root).render(App);
