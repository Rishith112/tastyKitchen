import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useCart } from '../CartContext/CartContext.js';

function Items() {
    const { restaurantId } = useParams();
    const navigate = useNavigate(); 
    const { addItemToCart, cartItems, incrementItemQuantity, decrementItemQuantity } = useCart();

    const [restaurantDetails, setRestaurantDetails] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRestaurantDetails() {
            setLoading(true);
            try {
                const url = `https://tastykitchen-backend-uok6.onrender.com/api/restaurants/items/${restaurantId}`;
                const jwt = Cookies.get('jwt_token');
                const options ={
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                  }
                }
                const response = await fetch(url, options);
                const data = await response.json();
                setRestaurantDetails(data);
            } catch (err) {
                setError('Failed to load restaurant details. Please try again.');
                setRestaurantDetails(null);
            }
            setLoading(false);
        }
        if (restaurantId) {
            fetchRestaurantDetails();
        }
    }, [restaurantId]);

    // Render loading state while data is being fetched
    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-xl text-[#64748b]">
            Loading restaurant details...
        </div>
        );
    }

    // Render error message if there was an error fetching data
    if (error) {
        return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-xl text-red-500 p-4 text-center">
            <p>{error}</p>
            <button
            onClick={() => navigate('/')} // Button to navigate back to the restaurants list
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors duration-200"
            >
            Go Back to Restaurants
            </button>
        </div>
        );
    }

    // Render message if no restaurant details are found (e.g., invalid ID or empty response)
    if (!restaurantDetails) {
        return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-xl text-gray-500 p-4 text-center">
            <p>No restaurant details found for ID: {restaurantId}</p>
            <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors duration-200"
            >
            Go Back to Restaurants
            </button>
        </div>
        );
    }

    // Destructure restaurant details for easier access in JSX
    const {
        name,
        rating,
        cost_for_two,
        cuisine,
        image_url,
        reviews_count,
        location,
        food_items,
    } = restaurantDetails;

    return (
        <div>
          <Header />
          <div className="font-inter bg-gray-50 min-h-screen pb-10">
              {/* ======================================= */}
              {/* ======== RESTAURANT HEADER V2 ========= */}
              {/* ======================================= */}
              {/* Changed to be a column on mobile and a row on desktop (md:) */}
              <div className="relative w-full bg-[#212121] p-6 md:p-10 rounded-b-lg shadow-md overflow-hidden">
                  {/* Background image for the header with opacity */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${image_url})` }}></div>
                  
                  {/* Content container: flex-col on mobile, md:flex-row on desktop */}
                  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 w-full max-w-7xl mx-auto">
                      
                      {/* Restaurant Image */}
                      {/* Changed to fixed size for mobile and larger fixed size for desktop for consistency */}
                      <img
                          src={image_url}
                          alt={name}
                          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg shadow-lg flex-shrink-0" // flex-shrink-0 prevents image from shrinking
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/cccccc/333333?text=Restaurant+Image"; }}
                      />
                      
                      {/* Restaurant Details Text */}
                      {/* text-center for mobile, md:text-left for desktop */}
                      <div className="text-white text-center md:text-left flex-1">
                          <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
                          <p className="text-lg md:text-xl mb-1">{cuisine}</p>
                          <p className="text-sm md:text-base mb-4">{location}</p>
                          <div className="flex items-center justify-center md:justify-start gap-4 mt-2 border-t border-white/20 pt-4">
                              <div className="flex items-center gap-1">
                                  {/* Star icon for rating */}
                                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-yellow-500">
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                  </svg>
                                  <div>
                                      <p className="font-bold text-lg leading-tight">{rating}</p>
                                      <p className="text-xs text-white/70">{reviews_count}+ ratings</p>
                                  </div>
                              </div>
                              {/* Separator line */}
                              <div className="w-px h-10 bg-white/50"></div>
                              <div>
                                  <p className="font-bold text-lg leading-tight">₹{cost_for_two}</p>
                                  <p className="text-xs text-white/70">Cost for two</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* ======================================= */}
              {/* ========= FOOD ITEMS SECTION V2 ========= */}
              {/* ======================================= */}
              <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Menu</h2>
                  {food_items && food_items.length > 0 ? (
                      // Grid: 1 column on mobile, md:2 columns on desktop
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {food_items.map((item) => {
                              const cartItem = (cartItems || []).find(ci => ci.id === item.id);
                              return (
                                  // MENU ITEM CARD: flex-col on mobile, sm:flex-row on larger screens
                                  <div key={item.id} className="flex flex-col sm:flex-row p-4">
                                      {/* Image Container */}
                                      <div className="w-full sm:w-1/3 flex-shrink-0">
                                          <img
                                              src={item.image_url}
                                              alt={item.name}
                                              className="w-full h-40 sm:h-full object-cover rounded-md"
                                          />
                                      </div>
                                    
                                      {/* Details Container */}
                                      <div className="flex flex-col flex-1 lg:pt-6 sm:pt-0 sm:pl-4">
                                          <h3 className="font-bold text-lg text-slate-700">{item.name}</h3>
                                          <p className="font-semibold text-slate-800 my-1">₹{item.cost}</p>
                                          <span className="flex items-center gap-1 text-sm text-slate-500">
                                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="text-yellow-500"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                              <span className="font-semibold text-yellow-600">{item.rating}</span>
                                          </span>
                                          
                                          {/* Spacer to push button to the bottom */}
                                          <div className="flex-grow"></div> 

                                          {/* Add/Remove Buttons */}
                                          <div className="mt-4">
                                              {cartItem ? (
                                                  <div className="flex items-center gap-3">
                                                      <button
                                                          className="px-3 py-1 border-2 border-gray-300 rounded-md font-bold text-lg"
                                                          onClick={() => decrementItemQuantity(item.id)}
                                                          aria-label={`Decrease quantity of ${item.name}`}
                                                      >
                                                          -
                                                      </button>
                                                      <span className="font-semibold text-orange-400 text-lg">{cartItem.quantity}</span>
                                                      <button
                                                          className="px-3 py-1 border-2 border-gray-300 rounded-md font-bold text-lg"
                                                          onClick={() => incrementItemQuantity(item.id)}
                                                          aria-label={`Increase quantity of ${item.name}`}
                                                      >
                                                          +
                                                      </button>
                                                  </div>
                                              ) : (
                                                  <button
                                                      className="px-5 py-2 border-2 border-orange-400 text-orange-400 font-semibold rounded-lg shadow-sm hover:bg-orange-400 hover:text-white transition-colors duration-200"
                                                      onClick={() => addItemToCart(item)}
                                                  >
                                                      Add To Cart
                                                  </button>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  ) : (
                      <div className="text-center py-10 text-gray-500 text-lg">
                          No food items found for this restaurant.
                      </div>
                  )}
              </section>
          </div>
          <div>
              <Footer />
          </div>
      </div>
    );
}

export default Items;
