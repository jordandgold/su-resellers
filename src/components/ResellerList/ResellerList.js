import React, { Component } from "react";

class ResellerList extends Component {
  render() {
    return (
      <div>
        {this.props.data.map(reseller => {
          return <div key={reseller.nid}>{reseller.title}</div>;
        })}
      </div>
    );
  }
}

export default ResellerList;
