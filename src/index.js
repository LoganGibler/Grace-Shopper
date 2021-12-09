import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useHistory,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  Navigation,
  Login,
  Register,
  Home,
  Products,
  Footer,
  Cart
} from "./components";
import { getAllProducts, getAllRoutines, getOrder} from "./api" 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [username, setUsername] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);


  async function fetchAllProducts(){
    const data = await getAllProducts();
    console.log("this is data",data)
    setAllProducts(data);
  }

  const fetchAllOrderItems = async () => {
    const data = await getOrder();
    setOrderItems(data);
    console.log(orderItems, "useEffect getOrder");
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllOrderItems();
  }, []);

  return (
    <Router>
      <div id="App">
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              username={username}
              setUsername={setUsername}
            />
          </Route>
          <Route path="/register">
            <Register 
              isLoggedIn={isLoggedIn} 
              setIsLoggedIn={setIsLoggedIn} 
              />
          </Route>
          <Route path="/products">
            <Products allProducts={allProducts} setAllProducts={setAllProducts}/>
          </Route>
          <Route path="/mycart">
            <Cart orderItems={orderItems} setOrderItems={setOrderItems}/>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
