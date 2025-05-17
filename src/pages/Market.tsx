import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Info, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchUnsplashImage } from "@/lib/fetchUnsplashImage";

type CropPrice = {
  crop: string;
  price: number;
  trend: "up" | "down" | "stable";
  change: string;
  imageUrl: string;
};

const MarketAdvisor = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [cropPrices, setCropPrices] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState(true);

  const getTrendIcon = (trend: CropPrice["trend"]) => {
    if (trend === "up") return <TrendingUp className="text-green-500" />;
    if (trend === "down") return <TrendingDown className="text-red-500" />;
    return <Info className="text-blue-500" />;
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://hdyorvkiqsiaamhrgjeg.functions.supabase.co/market-prices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeW9ydmtpcXNpYWFtaHJnamVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5ODQwMDcsImV4cCI6MjA2MDU2MDAwN30.0LMn_62OPYkdZhCIfisQdDrva4GfHLKN32Lq91dyC6A",
          },
          body: JSON.stringify({
            state: "Maharashtra",
            district: "Pune",
          }),
        });

        const data = await res.json();
        const withImages = await Promise.all(
          (data.prices || []).map(async (crop: any) => {
            const imageUrl = await fetchUnsplashImage(crop.crop);
            return { ...crop, imageUrl };
          })
        );
        setCropPrices(withImages);
      } catch (err) {
        console.error("Failed to fetch crop prices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const filteredCrops = cropPrices.filter((crop) =>
    crop.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6 flex-grow">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">{t("market.title")}</h1>
          <p className="text-muted-foreground mb-6">{t("market.description")}</p>

          <div className="flex gap-4 mb-8">
            <Input
              type="text"
              placeholder={t("market.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button>
              <Search className="w-4 h-4 mr-2" />
              {t("market.search")}
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading market prices...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">{crop.crop}</CardTitle>
                  {getTrendIcon(crop.trend)}
                </CardHeader>
                <CardContent>
                  <img
                    src={crop.imageUrl}
                    alt={crop.crop}
                    className="w-full h-40 object-cover mb-4 rounded"
                  />
                  <div className="text-2xl font-bold mb-2">
                    ₹{crop.price}
                    <span className="text-sm text-muted-foreground">/quintal</span>
                  </div>
                  <div
                    className={`text-sm ${
                      crop.trend === "up"
                        ? "text-green-500"
                        : crop.trend === "down"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  >
                    {crop.trend === "up" && "+"}
                    {crop.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MarketAdvisor;
