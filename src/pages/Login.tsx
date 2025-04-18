
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';
import { Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export const Icon = {
  spinner: Loader2,
  google: FcGoogle,
  // …other icons
}

const Login = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard'); // Redirect to dashboard if user is already logged in
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:flex flex-col space-y-6 p-6">
              <Logo size="large" className="mb-6" />
              <h1 className="text-2xl font-bold">
                {t('app.tagline')}
              </h1>
              <p className="text-muted-foreground">
                Join thousands of farmers across India to get personalized recommendations, weather forecasts, and community support.
              </p>
              <div className="bg-ks-light-green rounded-lg p-4 border border-ks-green/20">
                <h3 className="font-medium mb-2">Already a member?</h3>
                <p className="text-sm text-muted-foreground">
                  Login now to continue your journey with us and access all our farming tools and resources.
                </p>
              </div>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
