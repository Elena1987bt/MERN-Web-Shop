import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Announcement from './components/Announcement';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Announcement />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/productList">
          <ProductList />
        </Route>
        <Route path="/product">
          <Product />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
      <Newsletter />
      <Footer />
    </Router>
  );
};

export default App;
