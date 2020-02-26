import React, {Component} from 'react';

class SignedInNav extends Component {
    render() {
        return (
           <div>
               <nav className="navbar" role="navigation" aria-label="main navigation">
                   <div className="navbar-brand">
                       <a className="navbar-item" href="https://bulma.io">
                           {/*<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>*/}
                           <h2>Blupoint</h2>
                       </a>

                       <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                          data-target="navbarBasicExample">
                           <span aria-hidden="true"/>
                           <span aria-hidden="true"/>
                           <span aria-hidden="true"/>
                       </a>
                   </div>

                   <div id="navbarBasicExample" className="navbar-menu">
                       <div className="navbar-start">
                           <a className="navbar-item">
                               Dashboard
                           </a>

                           <a className="navbar-item">
                               Hardware Health
                           </a>

                           <a className="navbar-item">
                               Configuration
                           </a>
                       </div>

                       <div className="navbar-end">
                           <div className="navbar-item">
                               <div className="buttons">
                                   <a className="button is-light">
                                       Log out
                                   </a>
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