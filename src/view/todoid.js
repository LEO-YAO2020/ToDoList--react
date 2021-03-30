import React, { Component } from "react";
import store from "../store/index";
import "./todoid.css";

class todoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: store.getState(),
      id: 0,
    };
    this.storeChange = this.storeChange.bind(this);
    store.subscribe(this.storeChange);
  }

  render() {
    return (
      <div>
        <div className="list">
          <h3>Description: </h3>
          <span>{this.state.stores.list[this.state.id].Description}</span>
          <br />
          <h3>Category: &nbsp;&nbsp;</h3>
          <span>{this.state.stores.list[this.state.id].Category}</span>
          <br />
          <h3>Content: &nbsp;&nbsp;</h3>
          <span>{this.state.stores.list[this.state.id].Content}</span>
          <br />
        </div>
        <div>
          <button onClick={this.clickBack}>Back</button>
        </div>
      </div>
    );
  }
  clickBack = () => {
    window.history.go(-1);
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id });
  }
  storeChange() {
    this.setState(store.getState());
  }
}

export default todoItem;
