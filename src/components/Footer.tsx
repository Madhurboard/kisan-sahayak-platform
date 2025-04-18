
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-muted/50 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              {t('app.tagline')}
            </p>
            <div className="flex items-center space-x-3">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-ks-green transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-ks-green transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-ks-green transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-ks-green transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/weather" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('nav.weather')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/crops" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('nav.crops')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('nav.community')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/schemes" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('nav.schemes')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.helpCenter')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <PhoneCall size={18} />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={18} />
                <span>contact@kisansahayak.org</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Agricultural Hub, Tech Park, New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="text-center text-muted-foreground text-sm">
          <p>{t('footer.copyright').replace('2025', currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
