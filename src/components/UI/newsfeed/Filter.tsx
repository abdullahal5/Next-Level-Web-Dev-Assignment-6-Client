import Image from "next/image";

interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  date?: string;
  author?: string;
}

const articles: Article[] = [
  {
    id: "1",
    title:
      "WordPress News Magazine Charts the Most Chic and Fashionable Women of New York City",
    category: "FASHION",
    image:
      "https://img.freepik.com/free-photo/plants-pot-with-watering-can_23-2148905231.jpg?ga=GA1.1.196076015.1725610901&semt=ais_hybrid",
    date: "August 7, 2019",
    author: "Armin Vans",
  },
  {
    id: "2",
    title: "Game Changing Virtual Reality Console Hits the Market",
    category: "GADGETS",
    image:
      "https://img.freepik.com/free-photo/overhead-view-hand-holding-small-fresh-potted-plant_23-2147844319.jpg?t=st=1728461536~exp=1728465136~hmac=4cfe5ea48502e6ac4e9abbf7d6c0a9aa54cdb9e11cf1881b1fa2ae59f682a953&w=826",
  },
  {
    id: "3",
    title: "Discover the Most Magical Sunset in Santorini",
    category: "TRAVEL",
    image:
      "https://img.freepik.com/free-photo/close-up-man-watering-plants-with-sprinkler_23-2148396764.jpg?t=st=1728461555~exp=1728465155~hmac=603dda8ad3eba3c433bf3513727772fcce215d1d0eee1a8d533c9149c8758dcc&w=900",
  },
  {
    id: "4",
    title: "Computer Filters Noise to Make You a Better Listener",
    category: "REVIEWS",
    image:
      "https://img.freepik.com/premium-photo/gardener-is-planting-flower-garden_73944-16777.jpg?w=1380",
  },
];

const ArticleCard: React.FC<{ article: Article; className?: string }> = ({
  article,
  className,
}) => (
  <div className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}>
    <Image
      alt={article.title}
      className="transition-transform object-cover duration-300 hover:scale-105"
      layout="fill"
      src={article.image}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
    <div className="absolute bottom-0 left-0 p-4 text-white">
      <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold bg-red-600 rounded">
        {article.category}
      </span>
      <h2 className="mb-2 text-2xl font-bold leading-tight">{article.title}</h2>
      {article.author && article.date && (
        <p className="text-sm opacity-75">
          {article.author} - {article.date}
        </p>
      )}
    </div>
  </div>
);

const NewsGrid: React.FC = () => {
  const [mainArticle, ...otherArticles] = articles;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArticleCard
          article={mainArticle}
          className="md:row-span-2 h-[600px]"
        />
        <div className="grid grid-cols-1 gap-6">
          {otherArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              className="h-[280px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;
