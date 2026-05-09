export type Article = {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
  
    author: string;
    date: string;
    readingTime: string;
  
    featured?: boolean;
  };