import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import DashBoard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import CartDetails from "../cart/CartDetails";
import AddOrdUptadeProduct from "../products/AddOrUptadeProduct";
import NotFound from "../common/NotFound"
function App() {
  return (
    <Container>
      <Navi />
      <Switch>
        <Route exact path="/" component={DashBoard}></Route>
        <Route exact path="/product" component={DashBoard}></Route>
        <Route exact path="/cart" component={CartDetails}></Route>
        <Route exact path="/saveproduct" component={AddOrdUptadeProduct}></Route>
        <Route
          path="/saveproduct/:productId"
          component={AddOrdUptadeProduct}
        ></Route>
        <Route   component={NotFound}></Route>
      </Switch>
    </Container>
  );
}

export default App;
