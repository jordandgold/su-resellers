import React, { Component } from "react";
import { Button } from "terra-react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: undefined,
      status: "normal",
      country: "US"
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setFetch();

    const url = `https://dev-www.sketchup.com/api/resellers?_format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        const usData = data.filter(point => {
          return (
            point.field_su_reseller_address[0].country_code ===
            this.state.country
          );
        });

        this.setState({
          data: usData,
          status: "success"
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        status: "error"
      });
    }
  };

  setFetch = () => {
    this.setState({
      status: "fetching"
    });
  };
  render() {
    return (
      <div className="App">
        {this.state.status === "fetching" && <h3>fetching</h3>}
        {this.state.status === "success" && <h3>Success!</h3>}
        {this.state.status === "error" && <h3>error message!</h3>}
        {this.state.data && <div />}
        <Button
          onClick={() => {}}
          name="button"
          className="ter-button--primary--1"
        />
      </div>
    );
  }
}

export default App;
