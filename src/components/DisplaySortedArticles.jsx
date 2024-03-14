import ArticleCard from "./ArticleCard"
import { getArticlesByTopic } from "../utils/api"
import { useState } from "react"
import NotFound from "./NotFound"

export default function DisplaySortedArticles({articles, setCriterion, setSortOrder, setArticles, criterion, sortOrder, topic="", setSearchParams}) {
  const [error, setError] = useState(null)

  function handleSubmit (e) {
    e.preventDefault()
    setSearchParams({
      sort_by: criterion,
      order: sortOrder
    })
    getArticlesByTopic(topic, criterion, sortOrder)
    .then(({data: {articles}}) => {
      setArticles(articles)
    })
    .catch((err) => {
      setError(err)
    })
  }

  if (error) {
    return <NotFound err={"Error loading articles"}/>
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