
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CropRecommendationCard from '@/components/CropRecommendationCard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Leaf, AlertCircle } from 'lucide-react';

// Mock data for demonstration
const mockCropRecommendations = [
  {
    cropName: 'Rice',
    suitability: 'high' as const,
    growthDuration: '120-150 days',
    waterRequirements: 'high' as const,
    temperature: '20-35°C',
    seasonality: ['Kharif'],
    regions: ['Punjab', 'Haryana', 'Uttar Pradesh'],
    imageUrl: 'https://images.unsplash.com/photo-1536054580270-0d1ac7cea3c5?w=800&auto=format&fit=crop'
  },
  {
    cropName: 'Wheat',
    suitability: 'high' as const,
    growthDuration: '100-120 days',
    waterRequirements: 'medium' as const,
    temperature: '15-25°C',
    seasonality: ['Rabi'],
    regions: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh'],
    imageUrl: 'https://images.unsplash.com/photo-1530155939540-0256b27a12f8?w=800&auto=format&fit=crop'
  },
  {
    cropName: 'Cotton',
    suitability: 'medium' as const,
    growthDuration: '150-180 days',
    waterRequirements: 'medium' as const,
    temperature: '20-30°C',
    seasonality: ['Kharif'],
    regions: ['Gujarat', 'Maharashtra', 'Punjab'],
    imageUrl: 'https://images.unsplash.com/photo-1576295413501-9b5d81314b19?w=800&auto=format&fit=crop'
  },
  {
    cropName: 'Sugarcane',
    suitability: 'high' as const,
    growthDuration: '10-12 months',
    waterRequirements: 'high' as const,
    temperature: '20-35°C',
    seasonality: ['Year-round'],
    regions: ['Uttar Pradesh', 'Maharashtra', 'Karnataka'],
    imageUrl: 'https://images.unsplash.com/photo-1598933620103-98a905098b31?w=800&auto=format&fit=crop'
  },
  {
    cropName: 'Maize',
    suitability: 'medium' as const,
    growthDuration: '90-120 days',
    waterRequirements: 'medium' as const,
    temperature: '20-30°C',
    seasonality: ['Kharif', 'Rabi'],
    regions: ['Karnataka', 'Andhra Pradesh', 'Telangana'],
    imageUrl: 'https://images.unsplash.com/photo-1590599652694-1250fac26d14?w=800&auto=format&fit=crop'
  },
  {
    cropName: 'Soybean',
    suitability: 'low' as const,
    growthDuration: '90-120 days',
    waterRequirements: 'low' as const,
    temperature: '20-30°C',
    seasonality: ['Kharif'],
    regions: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan'],
    imageUrl: 'https://images.unsplash.com/photo-1599497967850-615cdb19e9ee?w=800&auto=format&fit=crop'
  }
];

const mockFertilizers = [
  {
    name: 'Urea',
    suitability: 'high' as const,
    crops: ['Rice', 'Wheat', 'Maize'],
    nutrients: 'High Nitrogen (46%)',
    application: 'Before sowing or during growth',
    dosage: '100-150 kg/ha',
    benefits: 'Promotes leaf growth and vegetation'
  },
  {
    name: 'DAP',
    suitability: 'high' as const,
    crops: ['Wheat', 'Rice', 'Cotton'],
    nutrients: 'Nitrogen (18%) and Phosphorus (46%)',
    application: 'During sowing',
    dosage: '100-125 kg/ha',
    benefits: 'Promotes root development and flowering'
  },
  {
    name: 'NPK Complex',
    suitability: 'medium' as const,
    crops: ['Sugarcane', 'Vegetables', 'Fruits'],
    nutrients: 'Balanced Nitrogen, Phosphorus, Potassium',
    application: 'Multiple stages',
    dosage: '150-200 kg/ha',
    benefits: 'Overall balanced nutrition'
  }
];

const Crops = () => {
  const { t } = useTranslation();
  const [soilType, setSoilType] = useState('');
  const [region, setRegion] = useState('');
  const [season, setSeason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasRecommendations, setHasRecommendations] = useState(false);
  
  const handleGetRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setHasRecommendations(true);
      setIsLoading(false);
    }, 1500);
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
            
            {!hasRecommendations && !isLoading && (
              <div className="text-center py-12">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
                  <Leaf className="h-10 w-10 text-ks-green" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Enter your details to get recommendations</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our smart system will analyze your soil type, region, and season to recommend 
                  the most suitable crops and fertilizers for optimal yield.
                </p>
              </div>
            )}
            
            {hasRecommendations && (
              <Tabs defaultValue="crops" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="crops">{t('crops.recommendedCrops')}</TabsTrigger>
                  <TabsTrigger value="fertilizers">{t('crops.recommendedFertilizers')}</TabsTrigger>
                  <TabsTrigger value="tips">{t('crops.irrigationTips')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="crops" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {mockCropRecommendations.map((crop, index) => (
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
                    {mockFertilizers.map((fertilizer, index) => (
                      <Card key={index} className="hover-scale card-shadow">
                        <CardHeader>
                          <CardTitle>{fertilizer.name}</CardTitle>
                          <CardDescription>Suitability: {fertilizer.suitability}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p><span className="font-medium">Nutrients:</span> {fertilizer.nutrients}</p>
                          <p><span className="font-medium">Recommended for:</span> {fertilizer.crops.join(', ')}</p>
                          <p><span className="font-medium">Application:</span> {fertilizer.application}</p>
                          <p><span className="font-medium">Dosage:</span> {fertilizer.dosage}</p>
                          <p><span className="font-medium">Benefits:</span> {fertilizer.benefits}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="tips" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('crops.irrigationTips')}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>Based on your soil type and region, here are some irrigation recommendations:</p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Apply water in early morning or late evening to reduce evaporation</li>
                          <li>For clay soils, water less frequently but more deeply</li>
                          <li>Consider drip irrigation to reduce water usage by up to 60%</li>
                          <li>Monitor soil moisture regularly using moisture sensors</li>
                          <li>Adjust irrigation based on rainfall patterns and crop growth stage</li>
                        </ul>
                        
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Water conservation tip</AlertTitle>
                          <AlertDescription>
                            Mulching around plants can reduce water evaporation by up to 70%
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('crops.soilHealth')}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>Improve your soil health with these recommendations:</p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Add organic matter like compost to improve soil structure</li>
                          <li>Practice crop rotation to prevent nutrient depletion</li>
                          <li>Consider cover crops during off-seasons to prevent erosion</li>
                          <li>Test soil pH annually and adjust as needed</li>
                          <li>Minimize tillage to preserve soil structure and beneficial organisms</li>
                        </ul>
                        
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Soil health tip</AlertTitle>
                          <AlertDescription>
                            Vermicomposting can significantly improve soil fertility and structure
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </div>
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
