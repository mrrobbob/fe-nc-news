import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "./Loading"
import { getTopics } from "../utils/api"

export default function TopicsNav () {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getTopics()
    .then(({data: {topics}}) => {
      setTopics(topics)
      setIsLoading(false)
    })
  }, [])

  return isLoading ? (
    <Loading/> 
  ) : (
    <div id="topics">
      <h2>Browse by Topic</h2>
      <Link to={"/"}><h4>All Articles</h4> </Link>
      {topics.map((topic) => {
        return (
          <Link to={`/articles/topics/${topic.slug}`} key={topic.slug}>
            <h4>{topic.slug + " "}</h4>
          </Link>
        )
      })}
    </div>
  )
}
