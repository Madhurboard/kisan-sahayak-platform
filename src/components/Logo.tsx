
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ className, size = 'medium' }: LogoProps) => {
  const { t } = useTranslation();
  const sizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className={cn('flex items-center gap-2 font-bold', className)}>
      <Leaf className={cn('text-ks-green', {
        'h-5 w-5': size === 'small',
        'h-6 w-6': size === 'medium',
        'h-8 w-8': size === 'large',
      })} />
      <span className={cn(sizes[size], 'text-foreground')}>
        {t('app.name')}
      </span>
    </div>
  );
};

export default Logo;
