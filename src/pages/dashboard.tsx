import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CloudSun, Sprout, Users, FileText, BarChart3 } from 'lucide-react';

const dashboardLinks = [
  {
    title: 'Weather Forecast',
    description: 'Check real-time and upcoming weather conditions.',
    icon: <CloudSun className="h-6 w-6 text-ks-green" />,
    link: '/weather',
  },
  {
    title: 'Crop Recommendations',
    description: 'View suggestions based on climate and soil.',
    icon: <Sprout className="h-6 w-6 text-ks-green" />,
    link: '/crops',
  },
  {
    title: 'Market Prices',
    description: 'Track current crop prices across regions.',
    icon: <BarChart3 className="h-6 w-6 text-ks-green" />,
    link: '/market',
  },
  {
    title: 'Government Schemes',
    description: 'Explore available farmer schemes and subsidies.',
    icon: <FileText className="h-6 w-6 text-ks-green" />,
    link: '/schemes',
  },
  {
    title: 'Community Forum',
    description: 'Connect with fellow farmers and share insights.',
    icon: <Users className="h-6 w-6 text-ks-green" />,
    link: '/community',
  },
];

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-muted/10 py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground mb-8">
            {currentUser?.email || 'Farmer'} 👋 Here's your quick access panel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardLinks.map(({ title, description, icon, link }) => (
              <Link to={link} key={title}>
                <Card className="transition hover:shadow-md hover:border-ks-green/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    {icon}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
