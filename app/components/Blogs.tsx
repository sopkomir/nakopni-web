import { blogs } from "../data/blogs";
import BlogCard from "./BlogCard";

export default function Blogs() {
  return (
    <section className="space-y-14">

      {blogs.map((blog) => (

        <BlogCard
          key={blog.slug}
          slug={blog.slug}
          title={blog.title}
          excerpt={blog.excerpt}
          image={blog.image}
          author={blog.author}
        />

      ))}

    </section>
  );
}