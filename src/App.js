import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Products from "./components/products";
import Categories from "./components/categories.js";
import EditProduct from "./components/editProduct";
import EditCategory from "./components/editCategory";
import AddProduct from "./components/addProduct";
import AddCategory from "./components/addCategory";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/products" exact component={Products} />
        <Route path="/categories" exact component={Categories} />
        <Route path="/products/edit/:id" component={EditProduct} />
        <Route path="/categories/edit/:id" component={EditCategory} />
        <Route path="/addProduct" component={AddProduct} />
        <Route path="/addCategory" component={AddCategory} />
      </div>
    </Router>
  );
}

export default App;
