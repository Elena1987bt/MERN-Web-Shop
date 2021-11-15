import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home.jsx';
import User from './pages/user/User.jsx';
import UserList from './pages/userList/UserList.jsx';
import NewUser from './pages/newUser/NewUser.jsx';
import ProductList from './pages/productList/ProductList.jsx';
import Product from './pages/product/Product.jsx';
import NewProduct from './pages/newProduct/NewProduct.jsx';
import Login from './pages/login/Login.jsx';

import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {user && user.isAdmin ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/productList">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newProduct">
                <NewProduct />
              </Route>
            </div>
          </>
        ) : (
          <Login />
        )}
      </Switch>
    </Router>
  );
}

export default App;
