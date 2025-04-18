
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeHero from '@/components/HomeHero';
import FeaturesSection from '@/components/FeaturesSection';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HomeHero />
        <FeaturesSection />
        
        {/* Testimonials section could be added here */}
        
        {/* Call to action section */}
        <section className="bg-ks-light-green/30 py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Farming Community Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with thousands of farmers across India, share knowledge, and grow together
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/signup" 
                className="bg-ks-green hover:bg-ks-green/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Sign Up Now
              </a>
              <a 
                href="/community" 
                className="bg-white hover:bg-gray-50 text-ks-green border border-ks-green px-6 py-3 rounded-md font-medium transition-colors"
              >
                Explore Community
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
