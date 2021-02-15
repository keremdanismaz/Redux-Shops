import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";

class CartSummary extends Component {
  renderEmptyCart() {
    return (
      <NavItem className="mr-5">
        <NavLink className="mr-5">
          Empty Basket
          <i className="fa fa-shopping-basket" aria-hidden="true"></i>
        </NavLink>
      </NavItem>
    );
  }
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.set("notifier", "position", "top-right");
    alertify.error(product.productName + " Sepetten Silindi!");
  }
  renderSummary() {
    return (
      <UncontrolledDropdown className="mr-5" nav inNavbar>
        <DropdownToggle className="mr-5" nav caret>
          Basket - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem className="mr-5" key={cartItem.product.id}>
              <Badge
                color="danger"
                className="mr-2"
                onClick={() => this.removeFromCart(cartItem.product)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Badge>
              {cartItem.product.productName}
              <Badge className="ml-2" color="light">
                {cartItem.quantity}
              </Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Link to="cart" className="btn btn-secondary btn-xs">
              <i className="fa fa-shopping-cart"></i> Go to Basket
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmptyCart()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
