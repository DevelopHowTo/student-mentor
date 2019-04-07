import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import AdminLayout from "./layouts/Admin/Admin";
import Login from "./containers/Login/Login";
import NotFound from "./components/404/404";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        {!this.props.isLoggedIn ? (
          <Redirect from="/admin/dashboard" to="/login" />
        ) : null}
        <Route path="/admin/dashboard" exact component={AdminLayout} />
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
