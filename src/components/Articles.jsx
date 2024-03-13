import { useEffect, useState } from "react"

import { getAllArticles } from "../utils/api"
import Loading from "./Loading"
import ArticleCard from "./ArticleCard"
import { getArticlesByTopic } from "../utils/api"

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [criterion, setCriterion] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("ASC")

  useEffect(() => {
    setIsLoading(true)
    getAllArticles()
      .then(({ data: { articles } }) => {
        setArticles(articles)
        setIsLoading(false)
      })
  }, [])

  function handleSubmit (e) {
    e.preventDefault()
    getArticlesByTopic("", criterion, sortOrder)
    .then(({data: {articles}}) => {
      setArticles(articles)
    })
  }

  return isLoading ? <Loading /> : (
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
          <option value="DESC">Latest/A-Z/Most Rated</option>
          <option value="ASC">Oldest/Z-A/Least Rated</option>
        </select>
        <button type="submit">Sort</button>
      </form>
      <ul>
        {articles.map((article) => {
          return (
            <ArticleCard article={article} />
          )
        })}
      </ul>
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