import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeatherCard from '@/components/WeatherCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Search, MapPin } from 'lucide-react';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const Weather = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('New Delhi');
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      const dailyMap: Record<string, any> = {};

      data.list.forEach((entry: any) => {
        const dateObj = new Date(entry.dt * 1000);
        const dateStr = dateObj.toISOString().split('T')[0];
        const day = dateObj.toLocaleDateString(undefined, { weekday: 'long' });

        // Only take the first forecast of each day
        if (!dailyMap[dateStr]) {
          dailyMap[dateStr] = {
            date: dateStr,
            day,
            temperature: Math.round(entry.main.temp),
            condition: entry.weather[0].main,
            icon: entry.weather[0].icon,
            humidity: entry.main.humidity,
            windSpeed: entry.wind.speed,
          };
        }
      });

      const dailyForecast = Object.values(dailyMap).slice(0, 7);
      setWeatherData(dailyForecast);
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation('Your Location');
        await fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsLoading(false);
      }
    );
  };

  const handleLocationSearch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
      );
      const [place] = await res.json();
      if (place) {
        await fetchWeather(place.lat, place.lon);
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-ks-light-green/30 to-background py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-4">{t('weather.title')}</h1>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('weather.locationInput')}</CardTitle>
                <CardDescription>
                  Enter your location to get accurate weather forecasts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder={t('weather.locationInput')}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    onClick={handleLocationSearch}
                    className="flex gap-2 items-center"
                  >
                    <Search size={18} />
                    <span>{t('weather.searchLocation')}</span>
                  </Button>
                  <Button variant="outline" onClick={handleUseCurrentLocation}>
                    {t('weather.useCurrentLocation')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="7day" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="today">{t('weather.today')}</TabsTrigger>
                <TabsTrigger value="tomorrow">{t('weather.tomorrow')}</TabsTrigger>
                <TabsTrigger value="7day">{t('weather.nextDays')}</TabsTrigger>
              </TabsList>

              <TabsContent value="today">
                {weatherData[0] && (
                  <div className="max-w-md mx-auto">
                    <WeatherCard {...weatherData[0]} isToday isLoading={isLoading} />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tomorrow">
                {weatherData[1] && (
                  <div className="max-w-md mx-auto">
                    <WeatherCard {...weatherData[1]} isLoading={isLoading} />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="7day">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {weatherData.map((day, index) => (
                    <WeatherCard
                      key={index}
                      {...day}
                      isToday={index === 0}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Weather;
