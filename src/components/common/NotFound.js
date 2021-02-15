import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">
            <i className="fa fa-exclamation-triangle"></i> 404 Not Found !!!
          </h1>
          <p className="lead">- This page is invalid in project.</p>
          <hr className="my-2" />
          <p className="lead">
            <Link to="/" className="mt-4 btn btn-info">
              <i className="fa fa-home"></i> Return Main Page
            </Link>
          </p>
        </Jumbotron>
      </div>
    );
  }
}
