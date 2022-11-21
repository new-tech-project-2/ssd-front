import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RecoilRoot } from "recoil";
import App from "./App";

// if (process.env.NODE_ENV === "development") {
//     const { worker } = require("./mocks/browser");
//     worker.start();
// }

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
            <div id="modal-root"></div>
        </RecoilRoot>
    </React.StrictMode>
);
