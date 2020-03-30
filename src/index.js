import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter,HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

const application = (
  <Provider store={store}>
    <HashRouter basename="/auth-task-app">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HashRouter>
  </Provider>
);

ReactDOM.render(application, document.getElementById("root"));

serviceWorker.unregister();
