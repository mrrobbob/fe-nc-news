import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getArticlesByTopic } from "../utils/api"
import NotFound from "./NotFound"
import Loading from "./Loading"
import DisplaySortedArticles from "./DisplaySortedArticles"
import { useSearchParams } from "react-router-dom"

export default function OneTopic () {
  const {topic} = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [articles, setArticles] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [criterion, setCriterion] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("DESC")

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

  if (error) {
    if (error.response.status === 404) {
      return <NotFound err={"Topic doesn't exist!"}/>
    }
    else {
      return <NotFound err={error.message}/>
    }
  }

  if (!articles) {
    return <NotFound err={"No articles yet... Why not post one?"}/>
  }

  if (isLoading) {
    return <Loading/>
  }
  else {
    return (
      <DisplaySortedArticles articles={articles} setCriterion={setCriterion} setSortOrder={setSortOrder} setArticles={setArticles} criterion={criterion} sortOrder={sortOrder} topic={topic} setSearchParams={setSearchParams}/>
    )
  }
}