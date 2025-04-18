
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ForumPostCard from '@/components/ForumPostCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Search, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock forum posts for demonstration
const mockPosts = [
  {
    id: '1',
    title: 'Best practices for wheat cultivation in Punjab',
    content: 'I\'ve been growing wheat for 5 years and wanted to share some tips that have helped me increase my yield. First, timing of sowing is crucial - early November works best in Punjab. Second, proper irrigation at crown root initiation stage...',
    author: {
      id: 'user1',
      name: 'Gurpreet Singh',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    createdAt: new Date('2025-04-15T10:30:00'),
    likes: 24,
    comments: 7,
    topics: ['Wheat', 'Punjab', 'Cultivation'],
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1530155939540-0256b27a12f8?w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Help needed: Rice crop showing yellow leaves',
    content: 'My rice crop has started showing yellow leaves about 30 days after transplanting. I\'ve been using the regular fertilizers but the problem persists. Has anyone faced similar issues? What could be the cause and remedy?',
    author: {
      id: 'user2',
      name: 'Ravi Kumar',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    createdAt: new Date('2025-04-17T08:45:00'),
    likes: 8,
    comments: 12,
    topics: ['Rice', 'Disease', 'Help'],
    region: 'East India',
    imageUrl: 'https://images.unsplash.com/photo-1536054580270-0d1ac7cea3c5?w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'New organic pesticide giving amazing results',
    content: 'I\'ve been experimenting with a homemade organic pesticide for my vegetable farm and the results are incredible. It\'s a mix of neem oil, garlic extract, and soap solution. No more chemical pesticides for me!',
    author: {
      id: 'user3',
      name: 'Lakshmi Devi',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    createdAt: new Date('2025-04-16T15:20:00'),
    likes: 36,
    comments: 18,
    topics: ['Organic', 'Pesticide', 'Vegetables'],
    region: 'South India'
  },
  {
    id: '4',
    title: 'How are fellow farmers handling water scarcity this year?',
    content: 'With rainfall being lower than usual this year in Maharashtra, I\'m worried about irrigation for my sugarcane crop. What strategies are other farmers using to conserve water? Any specific irrigation techniques that are working well?',
    author: {
      id: 'user4',
      name: 'Ajay Patil',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    createdAt: new Date('2025-04-14T09:10:00'),
    likes: 28,
    comments: 22,
    topics: ['Water Conservation', 'Irrigation', 'Drought'],
    region: 'West India'
  },
  {
    id: '5',
    title: 'Success with direct seeding of rice - reduced labor costs by 40%',
    content: 'This year I switched from traditional transplanting to direct seeded rice (DSR) method and the results are promising. Not only did I save on labor costs, but water usage also reduced significantly. Happy to share my experience with anyone interested.',
    author: {
      id: 'user5',
      name: 'Mahendra Verma',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    createdAt: new Date('2025-04-13T14:30:00'),
    likes: 45,
    comments: 15,
    topics: ['Rice', 'Innovation', 'Cost Reduction'],
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Market trends for cotton this season - prices likely to rise',
    content: 'Based on current demand and supply indicators, cotton prices are expected to rise in the next 2-3 months. International demand is strong, and domestic stock is lower than last year. Good time to plan your selling strategy.',
    author: {
      id: 'user6',
      name: 'Rajesh Patel',
      avatar: 'https://i.pravatar.cc/150?img=6'
    },
    createdAt: new Date('2025-04-12T11:15:00'),
    likes: 32,
    comments: 8,
    topics: ['Cotton', 'Market', 'Prices'],
    region: 'West India'
  }
];

const topicOptions = [
  'All Topics',
  'Rice',
  'Wheat',
  'Cotton',
  'Sugarcane',
  'Vegetables',
  'Organic',
  'Irrigation',
  'Disease',
  'Market',
  'Innovation'
];

const regionOptions = [
  'All Regions',
  'North India',
  'South India',
  'East India',
  'West India',
  'Central India',
  'Northeast India'
];

const Community = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    topics: [] as string[],
    region: '',
    image: null as File | null
  });
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'All Topics' || post.topics.includes(selectedTopic);
    const matchesRegion = selectedRegion === 'All Regions' || post.region === selectedRegion;
    
    return matchesSearch && matchesTopic && matchesRegion;
  });
  
  const handleCreatePost = () => {
    // In a real app, this would send data to the backend
    const newPostObj = {
      id: `${posts.length + 1}`,
      title: newPost.title,
      content: newPost.content,
      author: {
        id: 'currentUser',
        name: 'Current User',
        avatar: 'https://i.pravatar.cc/150?img=8'
      },
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      topics: newPost.topics.length > 0 ? newPost.topics : ['General'],
      region: newPost.region || 'Not specified',
      imageUrl: newPost.image ? URL.createObjectURL(newPost.image) : undefined
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost({
      title: '',
      content: '',
      topics: [],
      region: '',
      image: null
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-muted/10">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('forum.title')}</h1>
              <p className="text-muted-foreground">
                Connect with farmers across India, share knowledge, and learn from each other
              </p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle size={18} />
                  {t('forum.createPost')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{t('forum.createPost')}</DialogTitle>
                  <DialogDescription>
                    Share your knowledge, questions, or experiences with the community
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">{t('forum.postTitle')}</Label>
                    <Input 
                      id="post-title" 
                      placeholder={t('forum.postTitle')}
                      value={newPost.title}
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-content">{t('forum.postContent')}</Label>
                    <Textarea 
                      id="post-content" 
                      placeholder={t('forum.postContent')}
                      className="min-h-32"
                      value={newPost.content}
                      onChange={e => setNewPost({...newPost, content: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('forum.filterByTopic')}</Label>
                      <Select 
                        value={newPost.topics[0] || ''} 
                        onValueChange={value => setNewPost({...newPost, topics: [value]})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {topicOptions.filter(topic => topic !== 'All Topics').map(topic => (
                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{t('forum.filterByRegion')}</Label>
                      <Select 
                        value={newPost.region} 
                        onValueChange={value => setNewPost({...newPost, region: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regionOptions.filter(region => region !== 'All Regions').map(region => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-image">{t('forum.uploadImage')}</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-4 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag and drop an image, or click to browse
                      </p>
                      <Input 
                        id="post-image" 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={e => setNewPost({
                          ...newPost, 
                          image: e.target.files ? e.target.files[0] : null
                        })}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => document.getElementById('post-image')?.click()}
                      >
                        Browse
                      </Button>
                      {newPost.image && (
                        <p className="mt-2 text-sm text-foreground">
                          Selected: {newPost.image.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleCreatePost}
                    disabled={!newPost.title || !newPost.content}
                  >
                    {t('forum.submit')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative col-span-1 md:col-span-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder={t('forum.searchPosts')}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="col-span-1">
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('forum.filterByTopic')} />
                    </SelectTrigger>
                    <SelectContent>
                      {topicOptions.map(topic => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-1">
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('forum.filterByRegion')} />
                    </SelectTrigger>
                    <SelectContent>
                      {regionOptions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="recent">{t('forum.recentPosts')}</TabsTrigger>
              <TabsTrigger value="popular">{t('forum.popularPosts')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="animate-fade-in">
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <ForumPostCard 
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      author={post.author}
                      createdAt={post.createdAt}
                      likes={post.likes}
                      comments={post.comments}
                      topics={post.topics}
                      region={post.region}
                      imageUrl={post.imageUrl}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No posts found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters, or create a new post
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="animate-fade-in">
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  [...filteredPosts]
                    .sort((a, b) => b.likes - a.likes)
                    .map((post, index) => (
                      <ForumPostCard 
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        author={post.author}
                        createdAt={post.createdAt}
                        likes={post.likes}
                        comments={post.comments}
                        topics={post.topics}
                        region={post.region}
                        imageUrl={post.imageUrl}
                      />
                    ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No posts found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters, or create a new post
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
