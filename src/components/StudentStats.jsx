import React, { Component } from "react";

class StudentStats extends Component {
  render() {
    return (
      <div>
        <h3>Total Students: {this.props.count}</h3>
      </div>
    );
  }
}

export default StudentStats;