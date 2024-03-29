import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { formatDate } from "../utils/utils"
import DeleteComment from "./DeleteComment"

export default function Comments({ articleComments, setArticleComments }) {
  const { user } = useContext(UserContext)

  return (
      <ul id="comment-list">
        {articleComments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <p>From {comment.author} on {formatDate(comment.created_at)}</p>
              <p>{comment.body}</p>
              <p>{comment.votes} {Math.abs(comment.votes) === 1 ? "like" : "likes"}</p>
              {user === comment.author ? (
                <DeleteComment commentId={comment.comment_id} setArticleComments={setArticleComments} articleComments={articleComments} />
              ) : null}
            </li>
          )
        })}
      </ul>
  )
}