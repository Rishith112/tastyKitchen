import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext.ts';
import Header from '../Header/Header.tsx';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, totalCost, incrementItemQuantity, decrementItemQuantity, clearCart } = useCart();

  const handlePlaceOrder = () => {
    // In a real application, you'd send this order to a backend.
    // For this example, we'll just navigate to the success page and clear the cart.
    navigate('/payment-success');
    clearCart(); // Clear the cart after placing the order
  };

  return (
    <div className="font-inter bg-white min-h-screen pb-10">
    <Header />
    <div className="max-w-4xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
            // =======================================
            // ========= EMPTY CART VIEW V2 ==========
            // =======================================
            // This part was already quite responsive. Minor tweaks for even smaller screens.
            <div className="flex flex-col items-center justify-center text-center py-20">
                <img
                    src="https://res.cloudinary.com/dbwnoheep/image/upload/v1754421125/cooking_1_f1nhhm.png"
                    alt="Empty Cart"
                    // Image size is slightly smaller on small screens (w-48) and larger on bigger screens (sm:w-64)
                    className="w-48 h-48 sm:w-64 sm:h-64 object-contain mb-6"
                />
                <h2 className="text-2xl font-semibold text-slate-800 mb-3">Your Cart is Empty!</h2>
                <p className="text-slate-600 mb-6 max-w-sm">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200"
                >
                    Shop Now
                </button>
            </div>
        ) : (
            // =======================================
            // ======== CART WITH ITEMS V2 ===========
            // =======================================
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Your Cart</h1>
                {/* -- DESKTOP HEADERS -- */}
                {/* Hidden on mobile, appears as a grid header on medium screens and up */}
                <div className="hidden md:grid grid-cols-6 gap-4 py-3 border-b border-gray-200 font-semibold text-gray-500 text-sm">
                    <div className="col-span-3">Item</div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Total</div>
                </div>

                {/* -- CART ITEM LIST -- */}
                <div>
                    {cartItems.map((item) => (
                        // ** CORE RESPONSIVE LOGIC FOR EACH ITEM **
                        // Mobile: 2-column grid to position quantity/price
                        // Desktop (md): 6-column grid for a table-like view
                        <div key={item.id} className="grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-2 items-center py-4 border-b border-gray-100 last:border-b-0">
                            
                            {/* Item (Image & Name) */}
                            {/* Mobile: Spans 2 cols to take full width. Desktop: Spans 3 cols */}
                            <div className="col-span-2 md:col-span-3 flex items-center gap-4">
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
                                />
                                <h3 className="font-semibold text-base sm:text-lg text-slate-700">{item.name}</h3>
                            </div>

                            {/* Unit Price (Desktop only) */}
                            <div className="hidden md:flex justify-center font-medium text-slate-600">
                                ₹{item.cost}
                            </div>

                            {/* Quantity Controls */}
                            {/* Mobile: Aligned to the left. Desktop: Centered. */}
                            <div className="flex items-center gap-2 justify-self-start md:justify-self-center">
                                <button
                                    onClick={() => decrementItemQuantity(item.id)}
                                    className="px-2.5 py-0.5 border-2 border-gray-300 rounded-md font-bold"
                                    aria-label={`Decrease quantity of ${item.name}`}
                                >-</button>
                                <span className="font-semibold w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => incrementItemQuantity(item.id)}
                                    className="px-2.5 py-0.5 border-2 border-gray-300 rounded-md font-bold"
                                    aria-label={`Increase quantity of ${item.name}`}
                                >+</button>
                            </div>

                            {/* Total Item Price */}
                            {/* Mobile: Aligned to the right. Desktop: Aligned to the right. */}
                            <div className="font-semibold text-orange-500 justify-self-end text-right">
                                ₹{item.cost * item.quantity!}
                            </div>
                        </div>
                    ))}
                </div>

                {/* -- ORDER TOTALS & ACTIONS -- */}
                <div className="pt-6 border-t border-gray-200 mt-6 space-y-4">
                    {/* Responsive Order Total row */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Order Total:</h2>
                        <span className="text-xl sm:text-2xl font-semibold text-slate-900">₹{totalCost}</span>
                    </div>

                    {/* Responsive Place Order button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handlePlaceOrder}
                            // Full width on mobile, auto-width on desktop
                            className="w-full md:w-auto px-8 py-3 bg-orange-400 text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition-colors duration-200"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
</div>
  );
}

export default Cart;
