import { useContext, useEffect, useState } from "react"
import { getArticleById, getCommentsByArticleId } from "../utils/api"
import Loading from "./Loading"
import NotFound from "./NotFound"
import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import SingleArticleBody from "./SingleArticleBody"
import Comments from "./Comments"
import Votes from "./Votes"

export default function SingleArticle() {
  const { user } = useContext(UserContext)
  const { article_id } = useParams()
  const [currArticle, setCurrArticle] = useState({})
  const [currArticleComments, setCurrArticleComments] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArticleById(article_id)
      .then(({ data: { article } }) => {
        setCurrArticle(article)
      })
      .catch((err) => {
        setError(err.message)
      })
      .then(() => {
        return getCommentsByArticleId(article_id)
      })
      .then(({ data: { comments } }) => {
        setCurrArticleComments(comments)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [article_id])

  if (error) {
    return <NotFound err={error} />
  }

  if (isLoading) {
    return <Loading />
  }


  return (
    <>
      {!user.username ? (
        <>
          <SingleArticleBody article={currArticle} />
          <Votes article_id={article_id}/>
          <h2>Comments</h2>
          <Comments articleComments={currArticleComments} setArticleComments={setCurrArticleComments}/>
          <p>Please login to comment</p>
        </>
      ) : (
        <>
          <SingleArticleBody article={currArticle} />
          <Votes article_id={article_id}/>
          <h2>Comments</h2>
          <Comments articleComments={currArticleComments} setArticleComments={setCurrArticleComments}/>
        </>
      )}
    </>


  )
}