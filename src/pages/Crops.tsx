import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CropRecommendationCard from '@/components/CropRecommendationCard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Leaf, AlertCircle } from 'lucide-react';
import { fetchUnsplashImage } from '@/lib/fetchUnsplashImage';


const Crops = () => {
  const { t } = useTranslation();
  const [soilType, setSoilType] = useState('');
  const [region, setRegion] = useState('');
  const [season, setSeason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasRecommendations, setHasRecommendations] = useState(false);

  const [filteredCrops, setFilteredCrops] = useState([]);
  const [filteredFertilizers, setFilteredFertilizers] = useState([]);
  const [irrigationTips, setIrrigationTips] = useState([]);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setHasRecommendations(false);

    try {
      const response = await fetch('https://hdyorvkiqsiaamhrgjeg.functions.supabase.co/recommend-crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeW9ydmtpcXNpYWFtaHJnamVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5ODQwMDcsImV4cCI6MjA2MDU2MDAwN30.0LMn_62OPYkdZhCIfisQdDrva4GfHLKN32Lq91dyC6A',
        },
        body: JSON.stringify({ soilType, region, season }),
      });

      const data = await response.json();
      const cropsWithImages = await Promise.all(
  (data.crops || []).map(async (crop: any) => {
    const imageUrl = await fetchUnsplashImage(crop.cropName);
    return { ...crop, imageUrl };
  })
);
setFilteredCrops(cropsWithImages);

      setFilteredFertilizers(data.fertilizers || []);
      setIrrigationTips(data.irrigationTips || []);
      setHasRecommendations(true);
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-ks-light-green/30 to-background py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-4">{t('crops.title')}</h1>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('crops.recommendation')}</CardTitle>
                <CardDescription>
                  Get personalized crop and fertilizer recommendations based on your soil and region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="soilType">{t('crops.soilType')}</Label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger id="soilType">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sandy">Sandy Soil</SelectItem>
                        <SelectItem value="clay">Clay Soil</SelectItem>
                        <SelectItem value="loamy">Loamy Soil</SelectItem>
                        <SelectItem value="silty">Silty Soil</SelectItem>
                        <SelectItem value="peaty">Peaty Soil</SelectItem>
                        <SelectItem value="chalky">Chalky Soil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">{t('crops.region')}</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North India</SelectItem>
                        <SelectItem value="south">South India</SelectItem>
                        <SelectItem value="east">East India</SelectItem>
                        <SelectItem value="west">West India</SelectItem>
                        <SelectItem value="central">Central India</SelectItem>
                        <SelectItem value="northeast">Northeast India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="season">{t('crops.season')}</Label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger id="season">
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                        <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                        <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                        <SelectItem value="year-round">Year-round</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleGetRecommendations} 
                  disabled={isLoading || !soilType || !region || !season}
                  className="gap-2"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  ) : (
                    <Leaf size={18} />
                  )}
                  {t('crops.calculateButton')}
                </Button>
              </CardFooter>
            </Card>

            {hasRecommendations && (
              <Tabs defaultValue="crops" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="crops">{t('crops.recommendedCrops')}</TabsTrigger>
                  <TabsTrigger value="fertilizers">{t('crops.recommendedFertilizers')}</TabsTrigger>
                  <TabsTrigger value="tips">{t('crops.irrigationTips')}</TabsTrigger>
                </TabsList>

                <TabsContent value="crops" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredCrops.map((crop, index) => (
                      <CropRecommendationCard 
  key={index}
  cropName={crop.cropName}
  suitability={crop.suitability}
  growthDuration={crop.growthDuration}
  waterRequirements={crop.waterRequirements}
  temperature={crop.temperature}
  seasonality={crop.seasonality}
  regions={crop.regions}
  imageUrl={crop.imageUrl}
/>

                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="fertilizers" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredFertilizers.map((fertilizer, index) => (
                      <Card key={index} className="hover-scale card-shadow">
                        <CardHeader>
                          <CardTitle>{fertilizer.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p><span className="font-medium">Nutrients:</span> {fertilizer.nutrients}</p>
                          <p><span className="font-medium">For Crops:</span> {fertilizer.forCrops?.join(', ')}</p>
                          <p><span className="font-medium">Application:</span> {fertilizer.application}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tips" className="animate-fade-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('crops.irrigationTips')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2">
                        {irrigationTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Crops;
