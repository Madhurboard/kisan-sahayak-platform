
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Flag,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface ForumPostCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
  comments: number;
  topics: string[];
  region: string;
  imageUrl?: string;
  className?: string;
}

const ForumPostCard = ({
  id,
  title,
  content,
  author,
  createdAt,
  likes,
  comments,
  topics,
  region,
  imageUrl,
  className
}: ForumPostCardProps) => {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  
  const toggleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
  
  const truncateContent = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Link to={`/profile/${author.id}`} className="font-medium hover:underline">
              {author.name}
            </Link>
            <p className="text-xs text-muted-foreground">{timeAgo} • {region}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Flag className="mr-2 h-4 w-4" />
              <span>{t('forum.report')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-3">
        <Link to={`/community/post/${id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-4">
          {truncateContent(content)}
        </p>
        
        {imageUrl && (
          <div className="relative mb-4 rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-auto max-h-60 object-cover rounded-md"
            />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          {topics.map((topic, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex justify-between">
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("flex items-center gap-1", {
              "text-primary": liked
            })}
            onClick={toggleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likeCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            asChild
          >
            <Link to={`/community/post/${id}`}>
              <MessageSquare className="h-4 w-4" />
              <span>{comments}</span>
            </Link>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span>{t('forum.share')}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForumPostCard;
