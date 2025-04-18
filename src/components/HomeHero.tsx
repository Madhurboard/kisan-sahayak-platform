
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HomeHero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-ks-light-green/30 to-background pt-16 pb-20">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t('home.welcome')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('home.welcomeMessage')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/weather">
                  {t('home.getStarted')}
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/community">
                  {t('nav.community')}
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-ks-green/10 rounded-full absolute -top-10 -right-10 w-40 h-40 animate-pulse-slow"></div>
            <div className="aspect-square bg-ks-yellow/20 rounded-full absolute -bottom-5 -left-5 w-20 h-20 animate-bounce-small"></div>
            
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                alt="Farmer in field" 
                className="w-full h-auto object-cover aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t('home.featuredInsights')}</h3>
                  <p className="text-white/80">
                    Get real-time agricultural insights, weather forecasts, and community support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="hidden lg:block absolute -top-20 -left-20 w-40 h-40 bg-ks-yellow/10 rounded-full"></div>
        <div className="hidden lg:block absolute bottom-10 right-0 w-60 h-60 bg-ks-green/5 rounded-full"></div>
      </div>
    </div>
  );
};

export default HomeHero;
