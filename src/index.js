import React from "react";
import ReactDOM from "react-dom";

//Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//Router
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

//Device Detect
import { isBrowser } from "react-device-detect";
import Mobile from "./Mobile";

//Redux
import reducer from "./Store/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

let app;

if (isBrowser) {
  app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
} else {
  app = <Mobile />;
}

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
