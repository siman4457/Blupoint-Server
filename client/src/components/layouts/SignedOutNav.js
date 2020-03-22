import React, { Component } from 'react';

class SignedOutNav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            <img className="nav-logo" src="./Icon.png" />
                        </a>

                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                            data-target="navbarBasicExample">
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default SignedOutNav;