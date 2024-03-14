import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getArticlesByTopic } from "../utils/api"
import NotFound from "./NotFound"
import Loading from "./Loading"
import ArticleCard from "./ArticleCard"

export default function OneTopic () {
  const {topic} = useParams()

  const [articles, setArticles] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [criterion, setCriterion] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("ASC")

  useEffect(() => {
    getArticlesByTopic(topic)
    .then(({data: {articles}}) => {
      setArticles(articles)
      setIsLoading(false)
    })
    .catch((err) => {
      setError(err)
    })
  }, [topic])

  function handleSubmit (e) {
    e.preventDefault()
    getArticlesByTopic(topic, criterion, sortOrder)
    .then(({data: {articles}}) => {
      setArticles(articles)
    })
  }

  if (error || !articles) {
    return <NotFound err={error}/>
  }

  if (isLoading) {
    return <Loading/>
  }
  else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="criteria"> Sort by: </label>
          <select onChange={(e) => {
            setCriterion(e.target.value);
          }}>
            <option value="created_at">Date Published</option>
            <option value="author">Author</option>
            <option value="votes">Votes</option>
          </select>
          <select onChange={(e) => {
            setSortOrder(e.target.value);
          }}>
            <option value="DESC">Latest/A-Z/Most Rated</option>
            <option value="ASC">Oldest/Z-A/Least Rated</option>
          </select>
          <button type="submit">Sort</button>
        </form>
        <ul>
          {articles.map((article) => {
            return (
              <ArticleCard article={article}/>
            )
          })}
        </ul>
      </>
    )
  }
}