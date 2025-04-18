
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Google } from 'lucide-react';

const LoginForm = () => {
  const { t } = useTranslation();
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t('auth.login')}</CardTitle>
        <CardDescription>
          {t('auth.dontHaveAccount')} <Link to="/signup" className="text-primary hover:underline">{t('auth.signup')}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder={t('auth.email')}
            disabled={true}
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder={t('auth.password')}
            disabled={true}
          />
        </div>
        <div className="text-right text-sm">
          <Link to="/forgot-password" className="text-primary hover:underline">
            {t('auth.forgotPassword')}
          </Link>
        </div>
        <Button disabled={true} className="w-full">
          {t('auth.login')}
        </Button>
        
        <div className="flex items-center gap-2 my-4">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-sm">{t('auth.orContinueWith')}</span>
          <Separator className="flex-1" />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <Google size={18} />
          {t('auth.google')}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {t('auth.dontHaveAccount')} <Link to="/signup" className="text-primary hover:underline">{t('auth.signup')}</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
