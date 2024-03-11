import { useEffect, useState } from "react"

import { getAllArticles } from "../utils/api"
import Loading from "./Loading"
import ArticleCard from "./ArticleCard"


export default function Articles() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getAllArticles()
      .then(({ data: { articles } }) => {
        setArticles(articles)
        setIsLoading(false)
      })
  }, [])

  return isLoading ? <Loading /> : (
    <ul>
      {articles.map((article) => {
        return (
          <ArticleCard article={article} key={article.article_id}/>
        )
      })}
    </ul>
  )
}