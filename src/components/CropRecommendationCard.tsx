
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Droplet, ThermometerSun, Globe, Calendar, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CropRecommendationCardProps {
  cropName: string;
  suitability: 'high' | 'medium' | 'low';
  growthDuration: string;
  waterRequirements: 'high' | 'medium' | 'low';
  temperature: string;
  seasonality: string[];
  regions: string[];
  imageUrl?: string;
  className?: string;
}

const CropRecommendationCard = ({
  cropName,
  suitability,
  growthDuration,
  waterRequirements,
  temperature,
  seasonality,
  regions,
  imageUrl,
  className
}: CropRecommendationCardProps) => {
  
  const suitabilityColors = {
    high: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-red-100 text-red-800'
  };
  
  const waterColors = {
    high: 'text-blue-500',
    medium: 'text-blue-400',
    low: 'text-blue-300'
  };
  
  return (
    <Card className={cn("overflow-hidden hover-scale card-shadow", className)}>
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={cropName} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Leaf className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge className={cn("absolute top-3 right-3", suitabilityColors[suitability])}>
          {suitability === 'high' ? 'Highly Suitable' : suitability === 'medium' ? 'Moderately Suitable' : 'Low Suitability'}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle>{cropName}</CardTitle>
        <CardDescription>Growth duration: {growthDuration}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Droplet className={cn("h-4 w-4", waterColors[waterRequirements])} />
            <span className="text-sm">
              {waterRequirements === 'high' ? 'High water' : waterRequirements === 'medium' ? 'Medium water' : 'Low water'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <ThermometerSun className="h-4 w-4 text-ks-yellow" />
            <span className="text-sm">{temperature}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-ks-green" />
            <div className="flex flex-wrap gap-1">
              {seasonality.map((season, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {season}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-ks-brown" />
            <div className="flex flex-wrap gap-1">
              {regions.slice(0, 2).map((region, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {region}
                </Badge>
              ))}
              {regions.length > 2 && (
                <Badge variant="outline" className="text-xs">+{regions.length - 2}</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default CropRecommendationCard;
