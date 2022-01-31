import React from "react";
import ReactDOM from "react-dom";
// import "antd/dist/antd.css"로 빌드시
// 버그가 있어서 아래처럼 바꿈
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import create from "./redux/create";

const store = create();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
