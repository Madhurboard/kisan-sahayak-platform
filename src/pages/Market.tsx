import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Info, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type CropPrice = {
  name: string;
  currentPrice: number;
  previousPrice: number;
  trend: "up" | "down" | "stable";
  imageUrl: string;
};

const MarketAdvisor = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const cropPrices: CropPrice[] = [
    {
      name: "Rice",
      currentPrice: 2200,
      previousPrice: 2100,
      trend: "up",
      imageUrl: "https://images.unsplash.com/photo-1602989106211-81de671c23a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Wheat",
      currentPrice: 2100,
      previousPrice: 2150,
      trend: "down",
      imageUrl: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Cotton",
      currentPrice: 6200,
      previousPrice: 6000,
      trend: "up",
      imageUrl: "https://images.unsplash.com/photo-1502395809857-fd80069897d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Sugarcane",
      currentPrice: 340,
      previousPrice: 340,
      trend: "stable",
      imageUrl: "https://images.unsplash.com/photo-1637335556827-bf5923d77f33?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Maize",
      currentPrice: 2000,
      previousPrice: 1950,
      trend: "up",
      imageUrl: "https://images.unsplash.com/photo-1693672843048-82d7c1a20974?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Soybean",
      currentPrice: 4600,
      previousPrice: 4700,
      trend: "down",
      imageUrl: "https://images.unsplash.com/photo-1562702076-c719c8796b8d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6 flex-grow">
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
                <img src={crop.imageUrl} alt={crop.name} className="w-full h-40 object-cover mb-4 rounded" />
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
      <Footer />
    </div>
  );
};

export default MarketAdvisor;
