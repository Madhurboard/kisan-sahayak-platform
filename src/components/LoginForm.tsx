import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (data.session) {
        toast({ title: t('auth.success'), description: t('auth.loggedIn') });
        navigate('/dashboard'); 
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: t('auth.loginFailed'),
        description: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };


  // Google OAuth login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
  
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${import.meta.env.VITE_APP_URL}/dashboard`,
        },
      });
  
      if (error) {
        throw error;
      }
      // Supabase will handle the redirect automatically
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: t('auth.googleLoginFailed'),
        description: err.message,
      });
      setIsLoading(false);
    }
  };
  


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{t('auth.login')}</CardTitle>
        <CardDescription>
          {t('Enter Credentials')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              : t('auth.login')
            }
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
          className="w-full flex items-center justify-center"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading
            ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            : <FcGoogle className="mr-2 h-4 w-4" />
          }
          {t('Continue With Google')}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {t('auth.dontHaveAccount')}{' '}
          <a
            href="/signup"
            className="text-ks-green hover:underline"
          >
            {t('Sign Up')}
          </a>
        </p>
      </CardFooter>
    </Card>
);

};

export default LoginForm;
