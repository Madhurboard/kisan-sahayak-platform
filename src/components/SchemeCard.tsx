
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, FileText, IndianRupee } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface SchemeCardProps {
  title: string;
  description: string;
  category: 'loan' | 'subsidy' | 'insurance' | 'training';
  eligibility: string[];
  deadline?: string;
  regions: string[];
  benefits: string;
  fundingAmount?: string;
  className?: string;
}

const SchemeCard = ({
  title,
  description,
  category,
  eligibility,
  deadline,
  regions,
  benefits,
  fundingAmount,
  className
}: SchemeCardProps) => {
  const { t } = useTranslation();
  
  const categoryColors = {
    loan: 'bg-blue-100 text-blue-800',
    subsidy: 'bg-green-100 text-green-800',
    insurance: 'bg-purple-100 text-purple-800',
    training: 'bg-orange-100 text-orange-800'
  };
  
  const categoryIcons = {
    loan: <IndianRupee className="h-5 w-5" />,
    subsidy: <IndianRupee className="h-5 w-5" />,
    insurance: <FileText className="h-5 w-5" />,
    training: <Users className="h-5 w-5" />
  };
  
  const formatDeadline = (dateString?: string) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <Card className={cn("overflow-hidden hover-scale card-shadow", className)}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={categoryColors[category]}>
            <div className="flex items-center gap-1">
              {categoryIcons[category]}
              <span>
                {category === 'loan' ? t('schemes.loans') :
                category === 'subsidy' ? t('schemes.subsidies') :
                category === 'insurance' ? t('schemes.insurance') :
                t('schemes.training')}
              </span>
            </div>
          </Badge>
          
          {deadline && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDeadline(deadline)}</span>
            </div>
          )}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-1">{t('schemes.eligibility')}:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {eligibility.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">{t('schemes.benefits')}:</h4>
          <p className="text-sm text-muted-foreground">{benefits}</p>
          
          {fundingAmount && (
            <div className="mt-2 flex items-center gap-1 text-sm font-medium">
              <IndianRupee className="h-4 w-4 text-ks-green" />
              <span>{fundingAmount}</span>
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Available in:</h4>
          <div className="flex flex-wrap gap-1">
            {regions.map((region, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {region}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-3">
        <Button asChild className="flex-1">
          <a href="#" target="_blank" rel="noopener noreferrer">
            {t('schemes.applyNow')}
          </a>
        </Button>
        <Button variant="outline" className="flex-1">
          {t('schemes.viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;
