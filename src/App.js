import React, { Component } from "react";
import "./App.css";
import ControlledForm from "./ControlledForm/ControlledForm";

class App extends Component {
  submit = submission => {
    console.log(submission);
  };

  render() {
    return (
      <div className="App">
        <ControlledForm submit={this.submit} />
      </div>
    );
  }
}

export default App;
