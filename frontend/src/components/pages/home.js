import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Import the local image (assuming it's in the same directory)
import primaryImage from './in.jpg'; // Local .jpg file
import fallbackImage from './in.jpg'; // Same as primary for fallback

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Image Section with Text Overlay */}
        <section className="relative w-full h-[calc(20rem+10cm)] overflow-hidden">
          <img
            src={primaryImage}
            alt="Welcome to Inventory Management"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out hover:scale-105 animate-zoom-in"
            onError={(e) => {
              console.error('Primary image failed to load, switching to fallback');
              e.target.src = fallbackImage;
              e.target.onerror = () => {
                console.error('Fallback image failed, using placeholder');
                e.target.src = 'https://via.placeholder.com/1920x1080?text=Image+Not+Available';
              };
            }}
            onLoad={() => console.log('Image loaded successfully')}
          />
          
          {/* Text Overlay with Transparent Effects */}
          <div className="absolute inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center transition-all duration-500 hover:bg-opacity-50">
            <div className="text-center p-4 transform transition-all duration-700 hover:scale-110 hover:rotate-1 animate-slide-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100 text-opacity-80 drop-shadow-2xl animate-bounce-in">
                Welcome to Our Inventory Solution
              </h1>
              <p className="text-md md:text-lg max-w-2xl mx-auto text-gray-200 text-opacity-70 drop-shadow-xl animate-fade-in bg-gray-900 bg-opacity-30 p-3 rounded-lg">
                Discover how our university-developed inventory system can
                transform your asset management. Simple, efficient, and tailored
                for academic excellence.
              </p>
            </div>
          </div>
        </section>
        
        <div className="flex-grow"></div>
      </main>
      
   
    </div>
  );
}

export default Home;