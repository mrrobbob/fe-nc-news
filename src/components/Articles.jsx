import { useEffect, useState } from "react"

import { getAllArticles } from "../utils/api"
import Loading from "./Loading"

import DisplaySortedArticles from "./DisplaySortedArticles"
import NotFound from "./NotFound"

import { useSearchParams } from "react-router-dom"

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [criterion, setCriterion] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("DESC")

  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setIsLoading(true)
    getAllArticles()
      .then(({ data: { articles } }) => {
        setArticles(articles)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
      })
  }, [])

  if (error) {
    return <NotFound err={"Error fetching articles"}/>
  }

  return isLoading ? <Loading /> : (
    <DisplaySortedArticles articles={articles} setCriterion={setCriterion} setSortOrder={setSortOrder} setArticles={setArticles} criterion={criterion} sortOrder={sortOrder} setSearchParams={setSearchParams}/>

  )
}