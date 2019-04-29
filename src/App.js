import React, { Component } from "react";
import "./App.css";
import ResellerList from "./components/ResellerList/ResellerList";
import newCountryArray from "./utilities/countryCodes";

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: undefined,
      status: "normal",
      country: undefined
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
        this.setState({
          data: data,
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

  changeCountry = country => {
    this.setState({
      country
    });
  };

  filterCountries = () => {
    return this.state.data.filter(country => {
      return (
        country.field_su_reseller_address_country_code ===
        this.state.country.code
      );
    });
  };

  render() {
    console.log(newCountryArray);
    return (
      <div className="App">
        <select className="select-country">
          <option>select a country</option>
          {newCountryArray.map((country, index) => {
            return (
              <option onClick={() => this.changeCountry(country)} key={index}>
                {country.name}
              </option>
            );
          })}
        </select>
        {this.state.status === "fetching" && <h3>fetching</h3>}
        {this.state.status === "success" && <h3>Success!</h3>}
        {this.state.status === "error" && <h3>error message!</h3>}
        {this.state.data && !this.state.country && (
          <ResellerList data={this.state.data} />
        )}
        {this.state.data &&
          this.state.country &&
          this.filterCountries().length > 0 && (
            <ResellerList data={this.filterCountries()} />
          )}
        {this.state.data &&
          this.state.country &&
          !this.filterCountries().length && (
            <div>There are no reselllers in {this.state.country.name}</div>
          )}
      </div>
    );
  }
}

export default App;
