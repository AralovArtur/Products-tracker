import React, { Component } from "react";
import axios from "axios";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
    };
  }

  onChangeCategory(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const category = {
      name: this.state.name,
    };

    axios
      .post("http://localhost:5000/categories/add", category)
      .then((res) => console.log(res.data));

    this.setState({
      category: "",
    });

    window.alert("Category is added");
  }

  render() {
    return (
      <div>
        <h3>Add new category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeCategory}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
