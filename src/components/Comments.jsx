import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import moment from "moment"
import { formatDate } from "../utils/utils"

export default function Comments({ articleComments, setArticleComments }) {
  const { user } = useContext(UserContext)

  return (
    <ul>
      {articleComments.map((comment) => {
        return (
          <>
            <p>From {comment.author} on {formatDate(comment.created_at)}</p>
            <p>{comment.body}</p>
            <p>{comment.votes} {Math.abs(comment.votes) === 1 ? "like" : "likes"}</p>
          </>

        )
      })}
    </ul>
  )
}