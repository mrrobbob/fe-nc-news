import { useEffect, useState } from "react"

import { getAllArticles } from "../utils/api"
import Loading from "./Loading"

import DisplaySortedArticles from "./DisplaySortedArticles"

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [criterion, setCriterion] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("DESC")

  useEffect(() => {
    setIsLoading(true)
    getAllArticles()
      .then(({ data: { articles } }) => {
        setArticles(articles)
        setIsLoading(false)
      })
  }, [])

  return isLoading ? <Loading /> : (
    <DisplaySortedArticles articles={articles} setCriterion={setCriterion} setSortOrder={setSortOrder} setArticles={setArticles} criterion={criterion} sortOrder={sortOrder}/>

  )
}