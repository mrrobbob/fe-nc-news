import { useContext, useEffect, useState } from "react"
import { getArticleById, getCommentsByArticleId } from "../utils/api"
import Loading from "./Loading"
import NotFound from "./NotFound"
import { useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import SingleArticleBody from "./SingleArticleBody"
import Comments from "./Comments"
import Votes from "./Votes"
import PostComment from "./PostComment"

export default function SingleArticle() {
  const { user } = useContext(UserContext)
  const { article_id } = useParams()
  const [currArticle, setCurrArticle] = useState({})
  const [currArticleComments, setCurrArticleComments] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [articleError, setArticleError] = useState(null)
  const [commentError, setCommentError] = useState(null)

  useEffect(() => {
    getArticleById(article_id)
      .then(({ data: { article } }) => {
        setCurrArticle(article)
      })
      .catch((err) => {
        setArticleError(err)
      })
      .then(() => {
        return getCommentsByArticleId(article_id)
      })
      .then(({ data: { comments } }) => {
        setCurrArticleComments(comments)
        setIsLoading(false)
      })
      .catch((err) => {
        setCommentError(err)
      })
  }, [article_id, currArticleComments])

  if (articleError) {
    if (articleError.response.status === 404) {
      return <NotFound err={"Article doesn't exist!"} />
    }
    else {
      return <NotFound err={error.message}/>
    }
  }

  if (commentError) {
    return <NotFound err={"Error loading comments"}/>
  }

  if (isLoading) {
    return <Loading />
  }


  return (
    <>
      {!user ? (
        <>
          <SingleArticleBody article={currArticle} />
          <Votes article_id={article_id}/>
          <p>Please login to comment</p>
          <h2>Comments</h2>
          <Comments articleComments={currArticleComments} setArticleComments={setCurrArticleComments}/>
        </>
      ) : (
        <>
          <SingleArticleBody article={currArticle} />
          <Votes article_id={article_id}/>
          <PostComment article_id={article_id} setArticleComments={setCurrArticleComments}/>
          <h2>Comments</h2>
          <Comments articleComments={currArticleComments} setArticleComments={setCurrArticleComments}/>
        </>
      )}
    </>


  )
}