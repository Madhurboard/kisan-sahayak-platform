
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudSun, 
  Sun, 
  Wind, 
  Droplets 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  date: string;
  day: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  isToday?: boolean;
  isLoading?: boolean;
  className?: string;
}

const WeatherCard = ({
  date,
  day,
  temperature,
  condition,
  icon,
  humidity,
  windSpeed,
  isToday = false,
  isLoading = false,
  className
}: WeatherCardProps) => {
  const { t } = useTranslation();

  // Map weather conditions to icons
  const getWeatherIcon = () => {
    switch (icon) {
      case 'clear':
        return <Sun className="h-12 w-12 text-ks-yellow" />;
      case 'partly-cloudy':
        return <CloudSun className="h-12 w-12 text-ks-yellow" />;
      case 'cloudy':
        return <Cloud className="h-12 w-12 text-muted-foreground" />;
      case 'rain':
        return <CloudRain className="h-12 w-12 text-blue-500" />;
      case 'thunderstorm':
        return <CloudLightning className="h-12 w-12 text-purple-500" />;
      case 'snow':
        return <CloudSnow className="h-12 w-12 text-blue-200" />;
      default:
        return <Cloud className="h-12 w-12 text-muted-foreground" />;
    }
  };

  if (isLoading) {
    return (
      <Card className={cn("h-full animate-pulse", className)}>
        <CardContent className="p-6 flex flex-col items-center space-y-4">
          <div className="h-4 w-20 bg-muted rounded"></div>
          <div className="h-12 w-12 bg-muted rounded-full"></div>
          <div className="h-6 w-16 bg-muted rounded"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
          <div className="w-full flex justify-between mt-2">
            <div className="h-4 w-16 bg-muted rounded"></div>
            <div className="h-4 w-16 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "h-full transition-all hover-scale", 
      isToday ? "border-ks-green border-2" : "",
      className
    )}>
      <CardContent className="p-6 flex flex-col items-center space-y-3">
        <div className="text-sm font-medium text-muted-foreground">
          {isToday ? t('weather.today') : day} • {date}
        </div>
        
        <div className="my-2">
          {getWeatherIcon()}
        </div>
        
        <div className="text-3xl font-bold">
          {temperature}°{t('weather.celsius')}
        </div>
        
        <div className="text-sm font-medium text-center">
          {condition}
        </div>
        
        <div className="w-full flex justify-between text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Droplets size={16} />
            <span>{humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={16} />
            <span>{windSpeed} {t('weather.kmh')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
