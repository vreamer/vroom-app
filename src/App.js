import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import InventoryList from './components/inventory-list.component'
import CreateInventoryList from './components/create-inventory.component'
import CreateInventoryItemsList from './components/create-inventory-items.component'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg'
import { ToastContainer } from 'react-toastify';

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
                <li className="navbar-item">
                  <Link to="/create-inventory-items" className="nav-link">Update Inventory Items</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={InventoryList} />
          <Route path="/create" component={CreateInventoryList} />
          <Route path="/create-inventory-items" component={CreateInventoryItemsList} />
          <ToastContainer />
        </div>
      </Router>
    );
  }
}

export default App;
