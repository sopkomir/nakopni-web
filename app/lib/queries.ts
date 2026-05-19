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
  ]
  | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    excerpt,
    image,
    category,
    publishedAt,
    views
  },

  "posts": *[
    _type == "article"
  ]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image,
    category,
    publishedAt,
    views
  }
}
`
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

export const commentsQuery = `
*[
  _type == "article" &&
  category == "komentar" &&
  featured != true
]
| order(publishedAt desc) {
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

export const blogsQuery = `
*[
  _type == "article" &&
  category == "blog" &&
  featured != true
]
| order(publishedAt desc) {
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

export const rozhovoryQuery = `
*[
  _type == "article" &&
  category == "rozhovor"
]
| order(publishedAt desc) {
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

export const articleQuery = `
*[
  _type == "article" &&
  slug.current == $slug
][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  image,
  category,
  featured,
  author,
  publishedAt,
  views
}
`;

export const reportazeQuery = `
*[
  _type == "article" &&
  category == "reportaze"
]
| order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  content,
  image,
  category,
  featured,
  author,
  publishedAt,
  views
}
`;