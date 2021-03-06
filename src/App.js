import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import Navbar from "./components/Navbar";
import ContactPage from "./components/ContactPage";
import CreateContact from "./components/Create-contact";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./components/Home";
import Login from "./auth/Login";
import error404 from "./components/404";

function onAuthRequired({ history }) {
  history.push("/login");
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Security
          issuer="https://dev-180699.okta.com/oauth2/default"
          client_id="0oaadg34wgFvicdmZ4x6"
          redirect_uri={window.location.origin + "/implicit/callback"}
          onAuthRequired={onAuthRequired}
        >
          <Navbar />
          <br />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <SecureRoute path="/contact/:id" component={ContactPage} />
              <SecureRoute path="/create" component={CreateContact} />
              <Route
                path="/login"
                render={() => <Login baseUrl="https://dev-180699.okta.com/" />}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route component={error404} />
            </Switch>
          </div>
        </Security>
      </Router>
    </Provider>
  );
}

export default App;
