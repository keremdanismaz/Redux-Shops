import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Table,Button,Jumbotron} from "reactstrap";
import {Link} from "react-router-dom"
import alertify from "alertifyjs";

class CartDetails extends Component {
    removeFromCart(product) {
        this.props.actions.removeFromCart(product);
        alertify.set("notifier", "position", "top-right");
        alertify.error(product.productName+" Sepetten Silindi!")
    }
  emptyCart() {
    return (
      <div>
          <br></br>
        <Jumbotron>
          <h1 className="display-3">
            <i className="fa fa-shopping-cart"></i> Empty Basket
          </h1>
          <hr className="my-2" />
          <p className="lead">
            <Link to="/" className="btn btn-primary " color="primary">
              <i className="fa fa-repeat"></i> Contunie
            </Link>
          </p>
        </Jumbotron>
      </div>
    );
  }
  renderCart() {
    return (
      <Table striped>
          
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Unit In Stock</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartitem) => (
            <tr key={cartitem.product.id}>
              <td>{cartitem.product.id}</td>
              <td>{cartitem.product.productName}</td>
              <td>{cartitem.product.unitPrice}</td>
              <td>{cartitem.product.unitsInStock}</td>
              <td>{cartitem.quantity}</td>
              <td>
                <Button
                  onClick={() => this.removeFromCart(cartitem.product)}
                  className="btn btn-primary"
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return <div>
         {this.props.cart.length>0 ? this.renderCart() :this.emptyCart()}
    </div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);
