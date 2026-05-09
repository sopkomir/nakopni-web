type VideoCardProps = {
    title: string;
    image: string;
    views: string;
  };
  
  export default function VideoCard({
    title,
    image,
    views,
  }: VideoCardProps) {
    return (
      <article className="border-b pb-6 group">
  
        <img
          src={image}
          alt={title}
          className="mb-3"
        />
  
        <h3 className="text-xl hover:text-orange-500 transition-colors font-black leading-snug mb-2group cursor-pointer">
          {title}
        </h3>
  
        <p className="text-sm text-gray-500">
          {views}
        </p>
  
      </article>
    );
  }