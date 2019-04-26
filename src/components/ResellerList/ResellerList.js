import React, { Component } from "react";

class ResellerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.data.map(reseller => {
          return <div>{reseller.field_su_reseller_name[0].value}</div>;
        })}
      </div>
    );
  }
}

export default ResellerList;
