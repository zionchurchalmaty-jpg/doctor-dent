import { ContentGrid } from "@/components/ui/content-grid";
import ArticleCard from "@/components/cards/ArticleCard";
import Hero from "@/components/Hero"; 
import { getPublishedContent } from "@/lib/firestore/content";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const articlesData = await getPublishedContent("blog");

  let allCategories: string[] = [];
  
  articlesData.forEach((article: any) => {
    const cat = article.category || article.tags; 
    
    if (!cat) return;

    if (Array.isArray(cat)) {
      cat.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          allCategories.push(item[locale] || item['ru']);
        } else if (typeof item === 'string') {
          allCategories.push(item);
        }
      });
    } 
    else if (typeof cat === 'object' && cat !== null) {
      allCategories.push(cat[locale] || cat['ru']);
    } 
    else if (typeof cat === 'string') {
      allCategories.push(cat);
    }
  });

  const uniqueCategories = Array.from(new Set(allCategories.filter(Boolean))).slice(0, 6);

  const getSingleCategory = (article: any) => {
    const cat = article.category || article.tags;
    if (!cat) return locale === 'ru' ? "Статья" : "Мақала";
    
    if (Array.isArray(cat) && cat.length > 0) {
      const first = cat[0];
      return typeof first === 'object' ? (first[locale] || first['ru']) : first;
    }
    if (typeof cat === 'object' && cat !== null) return cat[locale] || cat['ru'];
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
          title={locale === 'ru' ? "Все статьи" : "Барлық мақалалар"}
          showPagination={true} 
          rows={3} 
          items={articlesData.map((article: any) => {
            const rawDate = article.date || article.createdAt || new Date().toISOString();

            return (
              <ArticleCard
                key={article.id}
                id={article.id}
                image={article.image || "/images/blog-placeholder.png"}
                category={getSingleCategory(article)} 
                date={rawDate} 
                title={article.title}
                excerpt={article.excerpt || article.description || "..."}
                link={`/${locale}/${article.slug}`}
              />
            );
          })}
        />
      </main>
    </div>
  );
}