export const articlesQuery = `
*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  image{
    asset->
  },
  content
}
`;