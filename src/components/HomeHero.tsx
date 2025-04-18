import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

const HomeHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ks-light-green/30 to-background pt-20 pb-28">
      {/* Decorative Pulsing Background Circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-ks-yellow/20 rounded-full animate-pulse opacity-70 z-0" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-ks-green/10 rounded-full animate-bounce-slow z-0" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Text */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
              {t('home.welcome')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {t('home.welcomeMessage')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="gap-2 transition hover:scale-[1.03] hover:shadow-lg"
              >
                <Link to="/weather">
                  {t('home.getStarted')}
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 transition hover:scale-[1.03] hover:border-ks-green"
              >
                <Link to="/community">
                  <Users size={18} />
                  {t('nav.community')}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Section - Hero Image Card */}
          <div className="relative group transition-all duration-300 hover:scale-[1.02]">
            <div className="aspect-video bg-white rounded-xl shadow-xl overflow-hidden relative">
              <img
                src="https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.jpg?s=612x612&w=0&k=20&c=gvu-DzA17EyVSNzvdf7L3R8q0iIvLapG15ktOimqXqU="
                alt="Farmer in field"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-all">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                    {t('home.featuredInsights')}
                  </h3>
                  <p className="text-sm text-white/80">
                    Get real-time agricultural insights, weather forecasts, and community support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
