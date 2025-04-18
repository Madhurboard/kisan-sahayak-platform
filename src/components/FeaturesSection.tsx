
import { useTranslation } from 'react-i18next';
import FeatureCard from './FeatureCard';
import { Cloud, Seedling, BarChart3, Users, FileText } from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t('home.weather'),
      description: 'Get accurate 7-day weather forecasts for your location',
      icon: <Cloud className="h-6 w-6 text-ks-green" />,
      link: '/weather',
      variant: 'default' as const
    },
    {
      title: t('home.cropAdvisor'),
      description: 'Get personalized crop and fertilizer recommendations',
      icon: <Seedling className="h-6 w-6 text-ks-green" />,
      link: '/crops',
      variant: 'accent' as const
    },
    {
      title: t('home.marketPrices'),
      description: 'Track and predict market prices for your crops',
      icon: <BarChart3 className="h-6 w-6 text-ks-green" />,
      link: '/prices',
      variant: 'default' as const
    },
    {
      title: t('home.community'),
      description: 'Connect with other farmers and share knowledge',
      icon: <Users className="h-6 w-6 text-ks-green" />,
      link: '/community',
      variant: 'default' as const
    },
    {
      title: t('home.schemes'),
      description: 'Discover government schemes and subsidies',
      icon: <FileText className="h-6 w-6 text-ks-green" />,
      link: '/schemes',
      variant: 'muted' as const
    }
  ];

  return (
    <section className="py-20 container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('home.featuredInsights')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our range of tools and resources to help improve your farming practices and yields
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
