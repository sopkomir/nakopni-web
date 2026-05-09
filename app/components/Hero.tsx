import Image from "next/image";
import { hero } from "../data/hero";
import { articles } from "../data/articles";
import Link from "next/link";
const featured = articles[0];
export default function Hero() {
    return (
    
    <article className="pt-2 group cursor-pointer group cursor-pointer">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
  
          <div className="flex flex-col">
  
            <div className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-4">
            {hero.category}
            </div>
  
            <h2 className="text-4xl lg:text-5xl leading-[0.95] font-black leading-tight mb-6 group-hover:text-orange-500 transition-colors">
                <Link href={`/articles/${featured.slug}`}>
                {featured.title}
                </Link>
            </h2>
  
            <p className="text-xl text-gray-600 leading-relaxed">
            {hero.description}
            </p>
  
          </div>
  
          <Image
            src={featured.image}
            alt={hero.title}
            width={1200}
            height={800}
            className="w-full h-full object-cover min-h-[420px]"
            />
  
        </div>
      </article>
      
    );
  }