import React from "react";
import {
  BrowserRouter as Router,
  // Routes,
  Route,
  Link,
  Switch
} from "react-router-dom";
import "antd/dist/antd.css";
import Listing from "./component/Listing";
import Login from "./component/Login";
import  AppProvider  from "./Context";

function App() {
  return (
    <Router>
          <AppProvider>
      <Switch>
        <Route exact path="/">
            <Login />
        </Route>
        <Route exact path="/List">
          <Listing />
        </Route>
      </Switch>
          </AppProvider>
    </Router>
  );
}

export default App;
