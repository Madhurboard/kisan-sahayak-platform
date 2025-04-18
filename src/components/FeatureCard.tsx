
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    accent: 'bg-ks-light-green',
    muted: 'bg-muted/50'
  };
  
  return (
    <Card className={cn('border hover-scale card-shadow', variantStyles[variant], className)}>
      <CardHeader>
        <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Content can be added if needed */}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="group p-0">
          <Link to={link} className="flex items-center gap-2">
            Explore
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
