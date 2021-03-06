import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as AuthActions from "../../store/actions/auth";
import "./Login.css";
import Loader from '../Loader/Loader';

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleEmail = event => {
    this.setState({
      email: event.target.value
    });
  };
  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  handleForm = event => {
    event.preventDefault();
    // Dispatch authInit with user and type as "Login"
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.handleForm({ user, type: "Login" });
  };
  render() {
    let content;
    let errorMessageArr;
    if (this.props.loading) {
      // Show Loader
      content = <Loader />;
    } else if (this.props.isLoggedIn) {
      // Redirect to dashboard after login
      content = <Redirect to="/dashboard?tab=Dashboard" />;
    } else {
      // Show login form if not logged in
      if (this.props.error) {
        errorMessageArr = this.props.errorMessageArr;
      }
      content = (
        <form onSubmit={this.handleForm} className="Login__form">
          <div className="Login__form__control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={this.handleEmail}
              required
            />
          </div>
          <div className="Login__form__control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={this.handlePassword}
              required
            />
          </div>
          <input type="submit" value="Login" />
        </form>
      );
    }
    return (
      <div className="Login__container">
        <span className="errors">{errorMessageArr}</span>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    errorMessageArr: state.auth.errorMessageArr
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleForm: data => dispatch(AuthActions.authInit(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
