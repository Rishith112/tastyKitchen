import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home.tsx';
import Login from './Components/Login/Login.tsx';
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting.tsx';
import Items from './Components/Items/Items.tsx';
import Cart from './Components/Cart/Cart.tsx';
import PaymentSuccess from './Components/PaymentSuccessful/PaymentSuccessful.tsx';
import CartProvider from './Components/CartProvider/CartProvider.tsx';
import PageNotFound from './Components/PageNotFound/PageNotFound.tsx';
import SignUp from './Components/SignUp/SignUp.tsx';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<SignUp />} />
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
