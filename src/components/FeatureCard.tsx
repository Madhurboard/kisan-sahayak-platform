import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  variant?: 'default' | 'accent' | 'muted';
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  link,
  variant = 'default',
  className
}: FeatureCardProps) => {
  const variantStyles = {
    default: 'bg-card',
    accent: 'bg-ks-light-green/30',
    muted: 'bg-muted/40'
  };

  return (
    <Card
      className={cn(
        'transition-all duration-300 border hover:shadow-lg hover:scale-[1.02] rounded-xl overflow-hidden',
        variantStyles[variant],
        className
      )}
    >
      <CardHeader>
        <div className="mb-4 inline-flex items-center justify-center rounded-lg p-3 bg-primary/10 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Optional extra content can go here */}
      </CardContent>

      <CardFooter className="pt-2">
        <Button asChild variant="ghost" className="group p-0 text-sm">
          <Link to={link} className="flex items-center gap-1 text-primary">
            Explore
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
