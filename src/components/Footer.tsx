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
            <p className="text-muted-foreground text-sm">{t('app.tagline')}</p>
            <div className="flex items-center space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-muted-foreground hover:text-ks-green transition-colors"
                  aria-label={Icon.name}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['home', 'weather', 'crops', 'community', 'schemes'].map((navItem) => (
                <li key={navItem}>
                  <Link
                    to={`/${navItem === 'home' ? '' : navItem}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`nav.${navItem}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empty filler to push Contact to the far right */}
          <div className="hidden lg:block" />

          {/* Contact Info aligned right */}
          <div className="space-y-3 lg:text-right lg:items-end flex flex-col">
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2 lg:justify-end">
                <PhoneCall size={18} />
                <span>+91 1800-180-1551</span>
              </li>
              <li className="flex items-center gap-2 lg:justify-end">
                <Mail size={18} />
                <span>contact@kisansahayak.org</span>
              </li>
              <li className="flex items-start gap-2 lg:justify-end">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>MIT ADT UNIVERSITY</span>
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
