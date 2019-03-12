/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="https://www.education.develophowto.com">DevelopHowTo</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.develophowto.com">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.acquirehowto.com">Blog</NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by DevelopHowTo
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
