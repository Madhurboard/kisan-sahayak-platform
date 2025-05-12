import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const { email, user_metadata } = currentUser;
  const fullName = user_metadata?.full_name || 'Farmer';
  const avatarUrl = user_metadata?.avatar_url;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-muted/10 py-10">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatarUrl || ''} alt={fullName} />
                  <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{fullName}</h2>
                  <p className="text-muted-foreground text-sm">{email}</p>
                </div>
              </div>

              {/* Optional: Additional Profile Info */}
              {/* <div>
                <label className="block text-sm font-medium mb-1">Preferred Language</label>
                <select className="w-full rounded border p-2 text-sm">
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="ta">தமிழ்</option>
                  <option value="bn">বাংলা</option>
                  // Add more as needed
                </select>
              </div> */}

              <Button variant="destructive" onClick={handleLogout}>
                {t('nav.logout') || 'Logout'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
