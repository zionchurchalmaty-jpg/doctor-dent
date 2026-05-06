import { ContentGrid } from "@/components/ui/content-grid";
import ArticleCard from "@/components/cards/ArticleCard";
import Hero from "@/components/Hero"; 
import { getPublishedContent } from "@/lib/firestore/client-content";

export default async function BlogPage() {
  const rawArticlesData = await getPublishedContent("blog");
  const articlesData = rawArticlesData.filter((article: any) => !article.isSeo);

  let allCategories: string[] = [];
  articlesData.forEach((article: any) => {
    const cat = article.category || article.tags; 
    
    if (!cat) return;

    if (Array.isArray(cat)) {
      cat.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          allCategories.push(item['ru']);
        } else if (typeof item === 'string') {
          allCategories.push(item);
        }
      });
    } 
    else if (typeof cat === 'object' && cat !== null) {
      allCategories.push(cat['ru']);
    } 
    else if (typeof cat === 'string') {
      allCategories.push(cat);
    }
  });

  const uniqueCategories = Array.from(new Set(allCategories.filter(Boolean))).slice(0, 6);

  const getSingleCategory = (article: any) => {
    const cat = article.category || article.tags;
    if (!cat) return "Статья";
    
    if (Array.isArray(cat) && cat.length > 0) {
      const first = cat[0];
      return typeof first === 'object' ? first['ru'] : first;
    }
    if (typeof cat === 'object' && cat !== null) return cat['ru'];
    return cat;
  };

  return (
    <div className="min-h-screen">
      <Hero 
        variant="blog" 
        tags={uniqueCategories} 
      />

      <main className="bg-[#F8F9FA] pb-20 pt-10">
        <ContentGrid
          title="Все статьи"
          showPagination={true} 
          rows={3} 
          items={articlesData.map((article: any) => {
            const rawDate = article.date || article.createdAt || new Date().toISOString();

            return (
              <ArticleCard
                key={article.id}
                id={article.id}
                image={article.image || "/images/blog-placeholder.png"}
                imageAlt={article.seo?.imageAlt || article.title}
                category={getSingleCategory(article)} 
                date={rawDate} 
                title={article.title}
                excerpt={article.excerpt || article.description || "..."}
                link={`/${article.slug}`}
              />
            );
          })}
        />
      </main>
    </div>
  );
}