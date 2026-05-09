import { comments } from "../data/comments";
import CommentCard from "./CommentCard";

export default function Comments() {
  return (
    <section className="space-y-10">

      {comments.map((comment) => (

        <CommentCard
          key={comment.slug}
          slug={comment.slug}
          title={comment.title}
          description={comment.description}
          image={comment.image}
          author="Dušan Mikušovič"
          date="9. máj 2026"
        />

      ))}

    </section>
  );
}