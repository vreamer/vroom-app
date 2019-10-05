import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import InventoryList from './components/inventory-list.component'
import CreateInventoryList from './components/create-inventory.component'

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">V Room App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Inventory</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Inventory</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={InventoryList} />
          <Route path="/create" component={CreateInventoryList} />
        </div>
      </Router>
    );
  }
}

export default App;
