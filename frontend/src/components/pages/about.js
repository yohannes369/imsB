import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function About() {
  // Single inventory management image with fallback
  const primaryImage = 'https://images.unsplash.com/photo-1586528116498-cea48abe9f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
  const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow relative">
        {/* Image Section with Text Overlay */}
        <section className="relative w-full h-full overflow-hidden">
          <img
            src={primaryImage}
            alt="Inventory Management"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out hover:scale-105"
            onError={(e) => {
              console.error('Primary image failed to load, switching to fallback');
              e.target.src = fallbackImage;
              e.target.onerror = () => {
                console.error('Fallback image failed, using placeholder');
                e.target.src = 'https://via.placeholder.com/1920x1080?text=Inventory+Image+Not+Available';
              };
            }}
            onLoad={() => console.log('Image loaded successfully')}
          />
          
          {/* Text Overlay with Effects */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-500 hover:bg-opacity-60">
            <div className="text-center text-white p-8 transform transition-all duration-700 hover:scale-110 hover:rotate-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl animate-pulse">
                University Inventory System
              </h1>
              <p className="text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-xl animate-fade-in-up bg-gray-900 bg-opacity-70 p-4 rounded-lg">
                Developed by our university team, this inventory management system
                revolutionizes asset tracking for academic institutions. Monitor
                equipment, optimize resource allocation, and enhance operational
                efficiency with our innovative, user-friendly solution.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default About;