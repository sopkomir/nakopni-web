import { groq } from 'next-sanity'

export const allPostsQuery = groq`
  *[_type == "article"]
    | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      image
    }
`

export const homepageQuery = groq`
{
  "featured": *[
    _type == "article" &&
    featured == true
  ] | order(publishedAt desc)[0]{
    _id,
    title,
    slug,
    excerpt,
    image,

    category->{
      title,
      slug,
      color
    },

    author->{
      name,
      slug,
      photo
    },

    publishedAt,
    views
  },

  "komentare": *[
    _type == "article" &&
    category->slug.current == "komentare" &&
    featured != true
  ] | order(publishedAt desc)[0...5]{
    _id,
    title,
    slug,
    excerpt,
    image,

    category->{
      title,
      slug,
      color
    },

    author->{
      name,
      slug
    },

    publishedAt,
    views,

    audio{
      asset->{
        url
      }
    }
  },

  "fotoclanky": *[
    _type == "fotoclanok"
  ] | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    image
  }
}
`;

export const featuredQuery = `
*[
  _type == "article" &&
  featured == true
]
| order(publishedAt desc)[0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  image,
  category,
  featured,
  author,
  publishedAt
}
`;

export const commentsQuery = groq`
*[
  _type == "article" &&
  category->slug.current == "komentare" &&
  featured != true
]
| order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  content,
  image,

  category->{
    title,
    slug,
    color
  },

  author->{
    name,
    slug,
    photo
  },

  featured,
  publishedAt,
  views,

  audio{
    asset->{
      url
    }
  }
}
`;

export const blogsQuery = groq`
*[
  _type == "article" &&
  category->slug.current == "blog" &&
  featured != true
]
| order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  content,
  image,

  category->{
    title,
    slug,
    color
  },

  author->{
    name,
    slug,
    photo
  },

  featured,
  publishedAt,
  views
}
`;

export const rozhovoryQuery = groq`
*[
  _type == "article" &&
  category->slug.current == "rozhovor" &&
  featured != true
]
| order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  content,
  image,

  category->{
    title,
    slug,
    color
  },

  author->{
    name,
    slug,
    photo
  },

  featured,
  publishedAt,
  views
}
`;

export const articleQuery = groq`
*[
  _type == "article" &&
  slug.current == $slug
][0]{
  _id,
  title,
  slug,
  excerpt,
  content,
  image,

  category->{
    title,
    slug,
    color
  },

  author->{
    name,
    slug,
    photo,
    role
  },

  featured,
  publishedAt,
  views,

  audio{
    asset->{
      url
    }
  },

  seo
}
`;

export const reportazeQuery = groq`
*[
  _type == "article" &&
  category->slug.current == "reportaze" &&
  featured != true
]
| order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  content,
  image,

  category->{
    title,
    slug,
    color
  },

  author->{
    name,
    slug,
    photo
  },

  featured,
  publishedAt,
 views
}
`;

export const latestReportazeQuery = groq`
*[
  _type == "article" &&
  category->slug.current == "reportaze" &&
  featured != true
]
| order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  excerpt,
  image,

  category->{
    title,
    slug
  },

  publishedAt
}
`;

export const moreKomentareQuery = groq`
*[
  _type == "article" &&
  category->slug.current == "komentare" &&
  featured != true
]
| order(publishedAt desc)[5...13]{
  _id,
  title,
  slug,

  author->{
    name
  }
}
`;

export const siteSettingsQuery = groq`
*[_type == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  footerText,
  publisher,
  editorEmail,
  businessEmail,
  phone,
  address,
  ico,
  dic,
  registration,
  facebook,
  instagram,
  youtube,
  linkedin,
  copyright,
  logo{
  asset->{
    url
  }
}
`;

export const pageQuery = groq`
*[
  _type == "page" &&
  slug.current == $slug
][0]{
  _id,
  title,
  slug,
  excerpt,
  image,
  content,
  seo
}
`;

export const authorsQuery = groq`
*[_type == "author"] | order(name asc){
  _id,
  name,
  slug,
  photo,
  role,
  bio
}
`;

export const authorQuery = groq`
*[
  _type=="author" &&
  slug.current==$slug
][0]{
  _id,
  name,
  slug,
  role,
  bio,
  photo,

  "articles": *[
    _type=="article" &&
    author._ref==^._id
  ]
  | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    image,
    publishedAt,

    category->{
      title,
      slug
    }
  }
}
`;