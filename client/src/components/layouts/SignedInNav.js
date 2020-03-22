import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignedInNav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to={"/"} className="navbar-item">
              <img className="nav-logo" src="./Icon.png" />
            </Link>

            {/* RESPONSIVE HAMBURGER MENU */}
            {/* <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a> */}
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Dashboard
              </Link>

              <Link to="/config" className="navbar-item">
                Configuration
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <span className="button is-light">Log out</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default SignedInNav;
