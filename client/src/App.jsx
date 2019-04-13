import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import NotFound from "./components/404/404";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        {!this.props.isLoggedIn ? (
          <Redirect from="/dashboard" to="/login" />
        ) : null}
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
