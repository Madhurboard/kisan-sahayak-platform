import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Google } from 'lucide-react';

const LoginForm = () => {
  const { t } = useTranslation();
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Login attempt with:", email, password);
      toast({
        title: "Info",
        description: "Direct email/password login is not implemented yet.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login",
        description: "Please check your credentials and try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      toast({
        title: "Success!",
        description: "You've been logged in with Google successfully.",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login with Google",
        description: "An error occurred during Google authentication.",
      });
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{t('auth.login')}</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <a 
                href="#" 
                className="text-sm text-ks-green hover:underline"
              >
                {t('auth.forgotPassword')}
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? t('auth.loggingIn') : t('auth.login')}
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {t('auth.orContinueWith')}
            </span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <Google className="mr-2 h-4 w-4" />
          {t('auth.continueWithGoogle')}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {t('auth.dontHaveAccount')} {' '}
          <a 
            href="/signup" 
            className="text-ks-green hover:underline"
          >
            {t('auth.signup')}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
