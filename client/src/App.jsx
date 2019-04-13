import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import NotFound from "./components/404/404";
import * as actionTypes from "./store/actions/actionTypes";
import Loader from "./components/Loader/Loader";
import * as AuthActions from "./store/actions/auth";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.checkLogin();
  }
  render() {
    let content;
    if (this.props.isLoading) {
      content = <Loader />;
    } else {
      content = (
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
    return content;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loading: () => dispatch({ type: actionTypes.AUTH_START }),
    checkLogin: () => dispatch(AuthActions.checkLogin())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
