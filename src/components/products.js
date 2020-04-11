import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row } from "reactstrap";

const Product = (props) => (
  <tr>
    <td>{props.product.name}</td>
    <td>{props.product.category}</td>
    <td>{props.product.date.substring(0, 10)}</td>
    <td>
      <Link
        to={"/products/edit/" + props.product._id}
        className="btn btn-primary"
      >
        edit
      </Link>{" "}
      <a
        href="#"
        className="btn btn-secondary"
        onClick={() => {
          props.deleteProduct(props.product._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);

    this.state = {
      products: [],
      categories: [],
      category: "All",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/categories/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            categories: response.data.map((category) => category.name),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProduct(id) {
    axios.delete("http://localhost:5000/products/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      products: this.state.products.filter((el) => el._id !== id),
    });
  }

  productsList() {
    return this.state.products.map((currentProduct) => {
      return (
        <Product
          product={currentProduct}
          deleteProduct={this.deleteProduct}
          key={currentProduct._id}
        />
      );
    });
  }

  onChangeCategory(e) {
    this.setState({ category: e.target.value });
    const category = e.target.value;
    if (category === "All") {
      axios
        .get("http://localhost:5000/products/")
        .then((response) => {
          this.setState({ products: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get("http://localhost:5000/products/categories/" + category)
        .then((response) => {
          this.setState({ products: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <Row>
          <h3 style={{ margin: 10 }}>Products</h3>
          <select
            ref="userInput"
            required
            className="form-control"
            onChange={this.onChangeCategory}
            value={this.state.category}
            style={{ margin: 10 }}
          >
            {
              <option key="All" value="All">
                All
              </option>
            }
            {this.state.categories.map(function (category) {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </Row>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.productsList()}</tbody>
        </table>
      </div>
    );
  }
}
