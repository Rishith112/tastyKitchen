import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type { RestaurantType } from '../../types/globalTypes.ts';


const LIMIT = 9;

function Restaurants() {
  const navigate = useNavigate(); // Initialize navigate hook

  // Restaurant state and logic
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('Lowest');

  useEffect(() => {
    async function fetchRestaurants() {
      setLoading(true);
      try {
        const upi = `https://tastykitchen-backend-uok6.onrender.com/api/restaurants?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sort}`;
        const jwt = Cookies.get('jwt_token');
        const options ={
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        }
        const response = await fetch(upi, options);
        const data = await response.json();
        setRestaurants(data.restaurants || []);
        setTotal(data.total || 0);
      } catch (error) {
        setRestaurants([]);
        setTotal(0);
      }
      setLoading(false);
    }
    fetchRestaurants();
  }, [offset, sort]);

  // Pagination
  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;
  const goToPage = (page : number) => setOffset((page - 1) * LIMIT);

    // Function to handle clicking on a restaurant card
  const handleRestaurantClick = (restaurantId : string) => {
    navigate(`/restaurants/${restaurantId}`); // Navigate to the items page for the clicked restaurant
  };


  return (
    <>
      <section className="w-[99%] relative mb-8 px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#1e293b]">Popular Restaurants</h2>
            <p className="text-[#64748b] text-sm">Select Your favourite restaurant special dish and make your day happy...</p>
          </div>
          <div className="mt-2 md:mt-0">
            <select className="border rounded px-2 py-1 text-sm text-[#1e293b]" value={sort}  onChange={(e) => setSort(e.target.value)}>
              <option>Lowest</option>
              <option>Highest</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-10 text-[#64748b]">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {restaurants.map((rest) => (
              <div key={rest.id} className="bg-white rounded-lg shadow p-3 flex flex-col" onClick={() => handleRestaurantClick(rest.id)}>
                <img src={rest.image_url} alt={rest.name} className="w-full h-50 object-cover rounded-md mb-2" />
                <div className="font-semibold text-[#1e293b]">{rest.name}</div>
                <div className="text-xs text-[#64748b] mb-1">{rest.cuisine}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <span className="text-[#f59e0b] font-bold">{rest.user_rating.rating}</span>
                  </span>
                  <span className="text-[#64748b]">({rest.user_rating.total_reviews} ratings)</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded border bg-white text-[#1e293b] disabled:opacity-50"
          >
            {'<'}
          </button>
          <span className="mx-2 text-[#1e293b]">{currentPage} / {totalPages}</span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded border bg-white text-[#1e293b] disabled:opacity-50"
          >
            {'>'}
          </button>
        </div>
      </section>
    </>
  );
}

export default Restaurants;
