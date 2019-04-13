import React, { Component } from "react";
import { connect } from "react-redux";
import * as AuthActions from "../../store/actions/auth";
import "./Register.css";
import Loader from "../Loader/Loader";

class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    name: "",
    mobile: ""
  };
  handleInput = (event, key) => {
    this.setState({
      [key]: event.target.value
    });
  };
  handleForm = event => {
    event.preventDefault();
    // Dispatch authInit with user and type as "Register"
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.handleForm({ user, type: "Register" });
  };
  render() {
    let content;
    let errorMessageArr;
    if (this.props.loading) {
      // Show Loader
      content = <Loader />;
    } else {
      // Show login form if not logged in
      if (this.props.error) {
        errorMessageArr = this.props.errorMessageArr;
      }
      content = (
        <form onSubmit={this.handleForm} className="Register__form">
          <div className="Register__form__control">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={event => this.handleInput(event, "name")}
              required
            />
          </div>
          <div className="Register__form__control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={event => this.handleInput(event, "email")}
              required
            />
          </div>
          <div className="Register__form__control">
            <label htmlFor="mobile">Mobile No:</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              onChange={event => this.handleInput(event, "mobile")}
              required
            />
          </div>
          <div className="Register__form__control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={event => this.handleInput(event, "password")}
              required
            />
          </div>
          <div className="Register__form__control">
            <label htmlFor="password2">Confirm Password:</label>
            <input
              type="password"
              name="password2"
              id="password2"
              onChange={event => this.handleInput(event, "password2")}
              required
            />
          </div>
          <input type="submit" value="Register" />
        </form>
      );
    }
    return (
      <div className="Register__container">
        <span className="errors">{errorMessageArr}</span>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
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
)(Register);
