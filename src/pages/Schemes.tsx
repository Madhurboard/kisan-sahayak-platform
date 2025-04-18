
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SchemeCard from '@/components/SchemeCard';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Mock schemes data
const mockSchemes = [
  {
    id: '1',
    title: 'PM-KISAN',
    description: 'Income support of ₹6,000 per year in three equal installments',
    category: 'subsidy' as const,
    eligibility: [
      'All landholding farmers',
      'Subject to certain exclusions'
    ],
    deadline: undefined, // Ongoing scheme
    regions: ['All India'],
    benefits: 'Direct income support to farmer families',
    fundingAmount: '₹6,000 per year'
  },
  {
    id: '2',
    title: 'Kisan Credit Card',
    description: 'Easy access to credit for farmers',
    category: 'loan' as const,
    eligibility: [
      'All farmers',
      'Tenant farmers',
      'Oral lessees',
      'Self-help groups'
    ],
    deadline: undefined, // Ongoing scheme
    regions: ['All India'],
    benefits: 'Access to short-term loans at subsidized interest rates',
    fundingAmount: 'Up to ₹3 lakh'
  },
  {
    id: '3',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage',
    category: 'insurance' as const,
    eligibility: [
      'All farmers including sharecroppers and tenant farmers',
      'Growing notified crops'
    ],
    deadline: 'Seasonal application periods',
    regions: ['All India'],
    benefits: 'Insurance coverage and financial support in case of crop failure due to natural calamities'
  },
  {
    id: '4',
    title: 'Soil Health Card Scheme',
    description: 'Provides information to farmers on nutrient status of their soil',
    category: 'subsidy' as const,
    eligibility: [
      'All farmers'
    ],
    deadline: undefined, // Ongoing scheme
    regions: ['All India'],
    benefits: 'Soil health assessment and recommend appropriate dosage of nutrients'
  },
  {
    id: '5',
    title: 'Agricultural Skill Council of India - Skill Development',
    description: 'Training for farmers on modern agricultural techniques',
    category: 'training' as const,
    eligibility: [
      'Farmers',
      'Rural youth',
      'Agricultural workers'
    ],
    deadline: 'Rolling applications',
    regions: ['All India'],
    benefits: 'Skills development, certification, and improved employment opportunities in agricultural sector'
  },
  {
    id: '6',
    title: 'National Mission for Sustainable Agriculture',
    description: 'Promotes sustainable agriculture through water use efficiency, soil health management',
    category: 'subsidy' as const,
    eligibility: [
      'All farmers',
      'Focus on rainfed areas'
    ],
    deadline: undefined, // Ongoing scheme
    regions: ['All India'],
    benefits: 'Support for climate-resilient agriculture and efficient use of resources',
    fundingAmount: 'Variable subsidies for different components'
  }
];

const Schemes = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('All India');
  
  const filteredSchemes = mockSchemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All India' || scheme.regions.includes(selectedRegion);
    
    return matchesSearch && matchesCategory && matchesRegion;
  });
  
  const regions = ['All India', 'North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-ks-light-green/30 to-background py-12">
          <div className="container">
            <h1 className="text-3xl font-bold mb-4">{t('schemes.title')}</h1>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative col-span-1 md:col-span-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder={t('schemes.searchSchemes')}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('schemes.filterByCategory')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('schemes.allSchemes')}</SelectItem>
                        <SelectItem value="loan">{t('schemes.loans')}</SelectItem>
                        <SelectItem value="subsidy">{t('schemes.subsidies')}</SelectItem>
                        <SelectItem value="insurance">{t('schemes.insurance')}</SelectItem>
                        <SelectItem value="training">{t('schemes.training')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-1">
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('schemes.filterByRegion')} />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">{t('schemes.allSchemes')}</TabsTrigger>
                <TabsTrigger value="loans">{t('schemes.loans')}</TabsTrigger>
                <TabsTrigger value="subsidies">{t('schemes.subsidies')}</TabsTrigger>
                <TabsTrigger value="insurance">{t('schemes.insurance')}</TabsTrigger>
                <TabsTrigger value="training">{t('schemes.training')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredSchemes.map((scheme, index) => (
                    <SchemeCard 
                      key={scheme.id}
                      title={scheme.title}
                      description={scheme.description}
                      category={scheme.category}
                      eligibility={scheme.eligibility}
                      deadline={scheme.deadline}
                      regions={scheme.regions}
                      benefits={scheme.benefits}
                      fundingAmount={scheme.fundingAmount}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="loans" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredSchemes
                    .filter(scheme => scheme.category === 'loan')
                    .map((scheme, index) => (
                      <SchemeCard 
                        key={scheme.id}
                        title={scheme.title}
                        description={scheme.description}
                        category={scheme.category}
                        eligibility={scheme.eligibility}
                        deadline={scheme.deadline}
                        regions={scheme.regions}
                        benefits={scheme.benefits}
                        fundingAmount={scheme.fundingAmount}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="subsidies" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredSchemes
                    .filter(scheme => scheme.category === 'subsidy')
                    .map((scheme, index) => (
                      <SchemeCard 
                        key={scheme.id}
                        title={scheme.title}
                        description={scheme.description}
                        category={scheme.category}
                        eligibility={scheme.eligibility}
                        deadline={scheme.deadline}
                        regions={scheme.regions}
                        benefits={scheme.benefits}
                        fundingAmount={scheme.fundingAmount}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="insurance" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredSchemes
                    .filter(scheme => scheme.category === 'insurance')
                    .map((scheme, index) => (
                      <SchemeCard 
                        key={scheme.id}
                        title={scheme.title}
                        description={scheme.description}
                        category={scheme.category}
                        eligibility={scheme.eligibility}
                        deadline={scheme.deadline}
                        regions={scheme.regions}
                        benefits={scheme.benefits}
                        fundingAmount={scheme.fundingAmount}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="training" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredSchemes
                    .filter(scheme => scheme.category === 'training')
                    .map((scheme, index) => (
                      <SchemeCard 
                        key={scheme.id}
                        title={scheme.title}
                        description={scheme.description}
                        category={scheme.category}
                        eligibility={scheme.eligibility}
                        deadline={scheme.deadline}
                        regions={scheme.regions}
                        benefits={scheme.benefits}
                        fundingAmount={scheme.fundingAmount}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schemes;
