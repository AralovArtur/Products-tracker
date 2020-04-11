import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Products tracker
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/categories" className="nav-link">
                Categories
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/addProduct" className="nav-link">
                Add product
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/addCategory" className="nav-link">
                Add category
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
