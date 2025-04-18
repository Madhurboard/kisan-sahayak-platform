
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeatherCard from '@/components/WeatherCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin } from 'lucide-react';

// Mock data for demonstration
const mockWeatherData = [
  {
    date: '2025-04-18',
    day: 'Friday',
    temperature: 28,
    condition: 'Sunny',
    icon: 'clear',
    humidity: 45,
    windSpeed: 12
  },
  {
    date: '2025-04-19',
    day: 'Saturday',
    temperature: 27,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy',
    humidity: 50,
    windSpeed: 10
  },
  {
    date: '2025-04-20',
    day: 'Sunday',
    temperature: 26,
    condition: 'Cloudy',
    icon: 'cloudy',
    humidity: 60,
    windSpeed: 15
  },
  {
    date: '2025-04-21',
    day: 'Monday',
    temperature: 24,
    condition: 'Light Rain',
    icon: 'rain',
    humidity: 75,
    windSpeed: 18
  },
  {
    date: '2025-04-22',
    day: 'Tuesday',
    temperature: 23,
    condition: 'Rain',
    icon: 'rain',
    humidity: 80,
    windSpeed: 20
  },
  {
    date: '2025-04-23',
    day: 'Wednesday',
    temperature: 25,
    condition: 'Thunderstorm',
    icon: 'thunderstorm',
    humidity: 70,
    windSpeed: 22
  },
  {
    date: '2025-04-24',
    day: 'Thursday',
    temperature: 27,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy',
    humidity: 55,
    windSpeed: 14
  }
];

const Weather = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('New Delhi, India');
  const [weatherData, setWeatherData] = useState(mockWeatherData);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLocationSearch = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use the coordinates to fetch location name and weather data
          setLocation('Your Location');
          setTimeout(() => {
            setWeatherData(mockWeatherData);
            setIsLoading(false);
          }, 1000);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setIsLoading(false);
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
                <CardDescription>Enter your location to get accurate weather forecasts</CardDescription>
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
                  <Button onClick={handleLocationSearch} className="flex gap-2 items-center">
                    <Search size={18} />
                    <span>{t('weather.searchLocation')}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleUseCurrentLocation}
                  >
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
              
              <TabsContent value="today" className="animate-fade-in">
                <div className="max-w-md mx-auto">
                  <WeatherCard 
                    date={weatherData[0].date}
                    day={weatherData[0].day}
                    temperature={weatherData[0].temperature}
                    condition={weatherData[0].condition}
                    icon={weatherData[0].icon}
                    humidity={weatherData[0].humidity}
                    windSpeed={weatherData[0].windSpeed}
                    isToday={true}
                    isLoading={isLoading}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="tomorrow" className="animate-fade-in">
                <div className="max-w-md mx-auto">
                  <WeatherCard 
                    date={weatherData[1].date}
                    day={weatherData[1].day}
                    temperature={weatherData[1].temperature}
                    condition={weatherData[1].condition}
                    icon={weatherData[1].icon}
                    humidity={weatherData[1].humidity}
                    windSpeed={weatherData[1].windSpeed}
                    isToday={false}
                    isLoading={isLoading}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="7day" className="animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {weatherData.map((day, index) => (
                    <WeatherCard 
                      key={index}
                      date={day.date}
                      day={day.day}
                      temperature={day.temperature}
                      condition={day.condition}
                      icon={day.icon}
                      humidity={day.humidity}
                      windSpeed={day.windSpeed}
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
