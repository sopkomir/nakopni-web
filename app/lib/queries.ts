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
    author,
    views
  },

  "komentare": *[
    _type == "article" &&
    category == "komentar" &&
    featured != true
  ]
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    image,
    category,
    publishedAt,
    views
  },

  "fotoclanky": *[
    _type == "fotoclanok"
  ] | order(publishedAt desc)[0...4]
  {
    _id,
    title,
    slug,
    image
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
  category == "rozhovor" &&
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
  category == "reportaze" &&
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
  publishedAt,
  views
}
`;

export const latestReportazeQuery = `
*[
  _type == "article" &&
  category == "reportaze" &&
  featured != true
]
| order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  image,
  publishedAt
}
`;

export const moreKomentareQuery = `
*[
  _type == "article" &&
  category == "komentar" &&
  featured != true
]
| order(publishedAt desc)[4...12] {
  _id,
  title,
  slug,
  author
}
`;