import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/categories/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
      .post(
        "http://localhost:5000/categories/update/" + this.props.match.params.id,
        category
      )
      .then((res) => console.log(res.data));

    window.location = "/categories";
  }

  render() {
    return (
      <div>
        <h3>Edit the category</h3>
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
            <input type="submit" value="Edit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
