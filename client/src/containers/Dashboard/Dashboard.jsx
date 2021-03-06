import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import Profile from "./Profile/Profile";
import "./Dashboard.css";
import qs from "qs";

class Dashboard extends Component {
  state = {
    tabs: ["Dashboard", "Current Mentors", "Profile", "Find Mentors"]
  };
  handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Dispatch logout action
    this.props.logout();
  };
  render() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    const iconClass = [
      "fas fa-chart-pie",
      "fas fa-user",
      "far fa-id-card",
      "fas fa-search"
    ];
    let heading = "Dashboard";
    if (this.state.tabs.includes(query.tab)) {
      heading = query.tab;
    }
    let listItems = this.state.tabs.map((item, i) => {
      const listItemClasses = ["Dashboard__sideList__item"];
      if (query.tab === item) {
        listItemClasses.push("Dashboard__sideList__item--active");
      }
      return (
        <li key={i} className={listItemClasses.join(" ")}>
          <i className={iconClass[i]} />
          {item}
        </li>
      );
    });

    let content = <Profile />;
    return (
      <Fragment>
        <nav className="Dashboard__nav">
          {heading}
          <button onClick={this.handleLogout} className="btn btn-logout">
            Logout
          </button>
        </nav>
        <main className="Dashboard__main">
          <aside className="Dashboard__sideDrawer">
            <h3>Student Mentor</h3>
            <hr />
            <ul className="Dashboard__sideList">{listItems}</ul>
          </aside>
          <section className="Dashboard__section">{content}</section>
        </main>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: actionTypes.LOGOUT })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
