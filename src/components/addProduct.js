import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      category: "",
      date: new Date(),
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/categories/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            categories: response.data.map((category) => category.name),
            category: response.data[0].name,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
      name: this.state.name,
      category: this.state.category,
      date: this.state.date,
    };

    axios
      .post("http://localhost:5000/products/add", product)
      .then((res) => console.log(res.data));

    window.location = "/products";
  }

  render() {
    return (
      <div>
        <h3>Add new product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Category: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              onChange={this.onChangeCategory}
              value={this.state.category}
            >
              {this.state.categories.map(function (category) {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
