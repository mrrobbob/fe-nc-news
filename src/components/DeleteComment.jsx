import { useState } from "react"
import { deleteComment } from "../utils/api"

export default function DeleteComment ({setArticleComments, commentId}) {
  const [error, setError] = useState(false)
  const [deleted, setDeleted] = useState(false)

  function handleClick () {
    setDeleted(true)
    deleteComment(commentId)
    .then(() => {
      setArticleComments((currComments) => {
        const copy = [...currComments]
        return copy.filter((comm) => {comm.commentId !== commentId})
      })
      setError(false)
    })
    .catch((err) => {
      setError(true)
    })
  }

  return (
    <>
      <button onClick={handleClick} disabled={deleted}>Delete</button>
      <p>{deleted ? "Comment deleted" : null}</p>
      <p>{error ? "Error deleting comment" : null}</p>
    </>
  )
}