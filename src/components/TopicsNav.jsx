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
    <ul>
      <p>Filter by topic</p>
      <Link to={"/"}>All Articles </Link>
      {topics.map((topic) => {
        return (
          <Link to={`/articles/topics/${topic.slug}`} key={topic.slug}>
            {topic.slug + " "}
          </Link>
        )
      })}
    </ul>
  )
}
