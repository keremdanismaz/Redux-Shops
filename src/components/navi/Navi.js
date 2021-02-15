import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import CartSummary from "../cart/CartSummary"
import { Link } from "react-router-dom";
export default class Navi extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Navbar className="mt-3 mb-3" color="light" light expand="md">
          <NavbarBrand>
          <NavLink><Link  style={{textDecoration:'none' , color:'black' }} to="/"><i className="fa fa-home"></i> Redux Shops</Link></NavLink> 
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto " navbar>
              <NavItem>
                <NavLink><Link  style={{textDecoration:'none' , color:'gray' }} to="/saveProduct">Ekle</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/keremdanismaz">
                  GitHub <i className="fa fa-github"></i>
                </NavLink>
              </NavItem>
          <CartSummary/>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
