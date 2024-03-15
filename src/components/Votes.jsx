import { useEffect, useState } from "react"
import { getArticleById, patchArticleVotes } from "../utils/api"

export default function Votes({ article_id }) {
  const [votes, setVotes] = useState(0)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [hasDownvoted, setHasDownvoted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArticleById(article_id)
      .then(({ data: { article } }) => {
        setVotes(article.votes)
      })
      .catch((err) => {
        setError(err)
      })
  }, [article_id])

  function handleVoteInc() {
    let quantity = 1
    if (hasUpvoted) {
      quantity = -1
    }
    if (hasDownvoted) {
      setHasDownvoted(false)
      quantity = 2
    }
    setVotes((votes) => {
      return votes + quantity
    })
    patchArticleVotes(article_id, quantity)
      .catch((err) => {
        setVotes((votes) => {
          return votes + quantity
        })
      })
      .then(() => {
        if (hasUpvoted) {
          setHasUpvoted(false)
        }
        else {
          setHasUpvoted(true)
          setHasDownvoted(false)
        }
      })
  }

  function handleVoteDec() {
    let quantity = -1
    console.log(hasDownvoted)
    if (hasDownvoted) {
      quantity = 1
    }

    if (hasUpvoted) {
      setHasUpvoted(false)
      quantity = -2
    }
    setVotes((votes) => {
      return votes + quantity
    })
    patchArticleVotes(article_id, quantity)
      .catch((err) => {
        setVotes((votes) => {
          return votes + quantity
        })
      })
      .then(() => {
        if (hasDownvoted) {
          setHasDownvoted(false)
        }
        else {
          setHasDownvoted(true)
          setHasUpvoted(false)
        }
      })
  }

  return (
    <div id="votes">
      <button onClick={handleVoteInc}>Upvote</button>
      <p>{votes}</p>
      <button onClick={handleVoteDec}>Downvote</button>

      {hasDownvoted || hasUpvoted ? (
        <p id="if-voted">You voted!</p>
      ) : null}

      {error ? <p>There was an error communicating to the server</p> : null}
    </div>

  )
}