import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Contact() {
  const primaryImage = 'https://images.unsplash.com/photo-1586528116311-01c1d9b6c2f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Inventory shelves
  const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Image Section with Text Overlay */}
        <section className="relative w-full h-80 overflow-hidden">
          <img
            src={primaryImage}
            alt="Contact Us"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out hover:scale-105"
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
          
          {/* Text Overlay with Effects */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-500 hover:bg-opacity-60">
            <div className="text-center text-white p-4 transform transition-all duration-700 hover:scale-110 hover:rotate-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-2xl animate-pulse">
                Contact Us
              </h1>
              <p className="text-md md:text-lg max-w-2xl mx-auto drop-shadow-xl animate-fade-in-up bg-gray-900 bg-opacity-70 p-3 rounded-lg">
                Reach out to our university team for support or inquiries about
                our inventory management system. Email: inventory@university.edu
                | Phone: (123) 456-7890
              </p>
            </div>
          </div>
        </section>
        
        <div className="flex-grow"></div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Contact;