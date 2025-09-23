import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      <img src="https://res.cloudinary.com/dbwnoheep/image/upload/v1754425231/erroring_1_wsv0ky.png" className="h-64 w-64 mb-4" />
      <h1 className="text-3xl md:text-2xl font-semibold mb-4">Page Not Found</h1>
      <p className='pb-4'>We are sorry, the page you requested could not be found.</p>
      <p className='pb-4'>Please go back to homepage</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-orange-400 text-white rounded-lg shadow-md h-10"
      >
        Go to Home Page
      </button>
    </div>
  );
}

export default PageNotFound;