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
  publishedAt
}
`;