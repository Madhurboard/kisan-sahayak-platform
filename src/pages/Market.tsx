
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Search, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CropPrice = {
  name: string;
  currentPrice: number;
  previousPrice: number;
  trend: "up" | "down" | "stable";
};

const MarketAdvisor = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const cropPrices: CropPrice[] = [
    { name: "Rice", currentPrice: 2500, previousPrice: 2300, trend: "up" },
    { name: "Wheat", currentPrice: 1800, previousPrice: 2000, trend: "down" },
    { name: "Cotton", currentPrice: 5600, previousPrice: 5200, trend: "up" },
    { name: "Sugarcane", currentPrice: 350, previousPrice: 350, trend: "stable" }
  ];

  const getTrendIcon = (trend: CropPrice["trend"]) => {
    if (trend === "up") return <TrendingUp className="text-green-500" />;
    if (trend === "down") return <TrendingDown className="text-red-500" />;
    return <Info className="text-blue-500" />;
  };

  const filteredCrops = cropPrices.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">{t('market.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('market.description')}</p>
        
        <div className="flex gap-4 mb-8">
          <Input
            type="text"
            placeholder={t('market.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button>
            <Search className="w-4 h-4 mr-2" />
            {t('market.search')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop, index) => (
          <Card 
            key={crop.name}
            className="hover:shadow-lg transition-all duration-300 animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{crop.name}</CardTitle>
              {getTrendIcon(crop.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                ₹{crop.currentPrice}
                <span className="text-sm text-muted-foreground">/quintal</span>
              </div>
              <div className={`text-sm ${
                crop.trend === "up" ? "text-green-500" : 
                crop.trend === "down" ? "text-red-500" : 
                "text-blue-500"
              }`}>
                {crop.trend === "up" ? "+" : crop.trend === "down" ? "-" : ""}
                ₹{Math.abs(crop.currentPrice - crop.previousPrice)} from previous
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketAdvisor;
