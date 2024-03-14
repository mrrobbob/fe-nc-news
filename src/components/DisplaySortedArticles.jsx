import ArticleCard from "./ArticleCard"
import { getArticlesByTopic } from "../utils/api"

export default function DisplaySortedArticles({articles, setCriterion, setSortOrder, setArticles, criterion, sortOrder, topic=""}) {

  function handleSubmit (e) {
    e.preventDefault()
    getArticlesByTopic(topic, criterion, sortOrder)
    .then(({data: {articles}}) => {
      setArticles(articles)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="criteria"> Sort by: </label>
        <select onChange={(e) => {
          setCriterion(e.target.value)
        }}>
          <option value="created_at">Date Published</option>
          <option value="author">Author</option>
          <option value="votes">Votes</option>
        </select>
        <select onChange={(e) => {
          setSortOrder(e.target.value)
        }}>
          <option value="DESC">Latest/Z-A/Most Rated</option>
          <option value="ASC">Oldest/A-Z/Least Rated</option>
        </select>
        <button type="submit">Sort</button>
      </form>
      <ul>
        {articles.map((article) => {
          return (
            <ArticleCard article={article} key={article.article_id} />
          )
        })}
      </ul>
    </>
  )
}