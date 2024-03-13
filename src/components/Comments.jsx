import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { formatDate } from "../utils/utils"

export default function Comments({ articleComments, setArticleComments }) {

  return (
    <ul id="comment-list">
      {articleComments.map((comment) => {
        return (
          <li key={comment.comment_id}>
            <p>From {comment.author} on {formatDate(comment.created_at)}</p>
            <p>{comment.body}</p>
            <p>{comment.votes} {Math.abs(comment.votes) === 1 ? "like" : "likes"}</p>
          </li>
        )
      })}
    </ul>
  )
}