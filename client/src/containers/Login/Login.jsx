import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as AuthActions from "../../store/actions/auth";
import "./Login.css";

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
      // Show spinner on loading
      content = <div className="loader">Loading...</div>;
    } else if (this.props.isLoggedIn) {
      // Redirect to dashboard after login
      content = <Redirect to="/admin/dashboard" />;
    } else {
      // Show login form if not logged in
      if (this.props.error) {
        errorMessageArr = this.props.errorMessageArr;
      }
      content = (
        <form onSubmit={this.handleForm}>
          <input
            type="email"
            name="email"
            id="email"
            onChange={this.handleEmail}
            required
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={this.handlePassword}
            required
            placeholder="Password"
          />
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
