// ...existing imports...
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Restaurants from '../Restaurants/Restaurants';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      <main className="flex-1 flex flex-col items-center px-2 sm:px-4 md:px-0 w-full max-w-full">
        <Restaurants />
      </main>
      <Footer />
    </div>
  );
}

export default Home;