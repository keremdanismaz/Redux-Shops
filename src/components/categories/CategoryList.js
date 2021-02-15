import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryAction from "../../redux/actions/categoryActions";
import { ListGroup, ListGroupItem } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";


class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }
  selectCategory = (category) =>  {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id); 
  };
  render() {
    return (
      <div className="mt-4">
        <h3 className="ml-4"><i className="fa fa-list-alt"></i> Categories</h3>
        <ListGroup className="mt-4 rounded">
          {this.props.categories.map((categories) => (
            <ListGroupItem
              style={{cursor:'pointer'}}
              active={categories.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(categories)}
              key={categories.id}
            >
              <i className="fa fa-list-alt" style={{ color: "#6C757D" }}></i>{" "}
              {categories.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer, //Oluşan reducerdaki statei propsa aktarıyor ve orda kullanıyoruz.
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(categoryAction.getCategories, dispatch),
      changeCategory: bindActionCreators(
        categoryAction.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(
        productActions.getProducts,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
