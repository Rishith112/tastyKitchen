import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting';
import Items from './Components/Items/Items';
import Cart from './Components/Cart/Cart';
import PaymentSuccess from './Components/PaymentSuccessful/PaymentSuccessful';
import CartProvider from './Components/CartProvider/CartProvider.jsx';
import PageNotFound from './Components/PageNotFound/PageNotFound.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/home" element={
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          } />
          <Route path="/restaurants/:restaurantId" element={
            <ProtectedRouting>
              <Items />
            </ProtectedRouting>
          } />
          <Route path="/cart" element={
            <ProtectedRouting>
              <Cart />
            </ProtectedRouting>
          } />
          <Route path="/payment-success" element={
            <ProtectedRouting>
              <PaymentSuccess />
            </ProtectedRouting>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App
