import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { postComment } from "../utils/api"

export default function PostComment ({article_id, setArticleComments}) {
  const {user} = useContext(UserContext)
  const [newComment, setNewComment] = useState()
  const [error, setError] = useState(null)
  const [posted, setPosted] = useState(false)
  const [canPost, setCanPost] = useState(true)

  function handleSubmit (e) {
    e.preventDefault()
    setPosted(false)
    setCanPost(false)
    postComment(user, newComment, article_id)
    .then((comment) => {
      setNewComment("")
      setArticleComments((currComments) => {
        const copy = [comment ,...currComments]
        return copy
      })
      setPosted(true)
      setError(false)
      setCanPost(true)
    })
    .catch((err) => {
      setError(true)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment-text"></label>
      <textarea
        id="comment-text"
        value={newComment}
        onChange={(e) => {
          setNewComment(e.target.value)
          if (newComment === "") {
            setCanPost(false)
          }
        }}
        rows={4}
        required
        />
      <p>as {user}</p>
      <button type="submit" onClick={handleSubmit} disabled={!canPost}>Post</button>
      <p>{posted ? "Comment posted" : null}</p>
      <p>{error ? "Error posting comment" : null}</p>
    </form>
  )
}