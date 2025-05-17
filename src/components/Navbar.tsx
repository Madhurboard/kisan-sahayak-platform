import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  X,
  Sun,
  Cloud,
  Sprout,
  BarChart3,
  Users,
  FileText,
  User,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: t('nav.weather'), icon: <Cloud size={18} />, path: '/weather' },
    { name: t('nav.crops'), icon: <Sprout size={18} />, path: '/crops' },
    { name: t('nav.prices'), icon: <BarChart3 size={18} />, path: '/prices' },
    { name: t('nav.community'), icon: <Users size={18} />, path: '/community' },
    { name: t('nav.schemes'), icon: <FileText size={18} />, path: '/schemes' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to={currentUser ? '/dashboard' : '/'} className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Auth and Language Controls */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
  <Avatar className="h-10 w-10 border-2 border-green-500 p-0.5">
    <AvatarImage
      src={currentUser?.user_metadata?.avatar_url || ''}
      alt={currentUser?.user_metadata?.full_name || ''}
      className="rounded-full"
    />
    <AvatarFallback className="bg-muted text-foreground">
      {currentUser?.user_metadata?.full_name?.charAt(0)
        || currentUser?.email?.charAt(0)
        || 'U'}
    </AvatarFallback>
  </Avatar>
</Button>

              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.user_metadata?.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
  <Link to="/profile" className="flex items-center w-full">
    <User className="mr-2 h-4 w-4" />
    <span>{t('nav.profile')}</span>
  </Link>
</DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('nav.logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button asChild size="sm" className="hidden md:flex">
                <Link to="/signup">{t('Sign Up')}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Logo size="small" />
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  {!currentUser && (
                    <Button asChild className="mt-4">
                      <Link to="/login" onClick={toggleMenu}>
                        {t('nav.login')}
                      </Link>
                    </Button>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
