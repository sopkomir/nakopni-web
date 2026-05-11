export const articlesQuery = `
*[_type == "article"] | order(_createdAt desc) {
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