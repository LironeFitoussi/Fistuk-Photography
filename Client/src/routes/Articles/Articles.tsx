import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { useNavigate, useParams, Outlet } from "react-router-dom";

const DUMMY_ARTICLES = [
  {
    id: 1,
    title: "Article 1",
    description: "This is the first article",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nunc id aliquet ultrices, nunc nisl lacinia lacus, id lacinia tellus nunc id ligula.",
    buttonText: "Read More",
  },
  {
    id: 2,
    title: "Article 2",
    description: "This is the second article",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nunc id aliquet ultrices, nunc nisl lacinia lacus, id lacinia tellus nunc id ligula.",
    buttonText: "Read More",
  },
  {
    id: 3,
    title: "Article 3",
    description: "This is the third article",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nunc id aliquet ultrices, nunc nisl lacinia lacus, id lacinia tellus nunc id ligula.",
    buttonText: "Read More",
  },
];
const Articles: React.FC = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const handleArticleClick = (articleId: number) => {
    console.log(`Article ${articleId} clicked`);
    navigate(`article/${articleId}`);
  };

  return (
    <div>
      <h1>Articles</h1>
      <p>Articles will be displayed here</p>
      <div
        className="articles-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {!articleId ? (
          DUMMY_ARTICLES.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              buttonText={article.buttonText}
              body={article.body}
              clickHandler={handleArticleClick}
            />
          ))
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Articles;
