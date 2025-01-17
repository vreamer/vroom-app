import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import InventoryList from './components/inventory-list.component'
import ChecklistContainer from './components/checklist/checklists.container'

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
            <a className="navbar-brand" href="https://vroom-app.herokuapp.com/" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="logo" />
            </a>
            <Link to="/" className="navbar-brand">V Room App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Checklists</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/inventory" className="nav-link">Inventory</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={ChecklistContainer} />
          <Route path="/inventory" exact component={InventoryList} />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar />
        </div>
      </Router>
    );
  }
}

export default App;
