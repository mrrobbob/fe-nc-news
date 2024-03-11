import { useEffect, useState } from "react"
import { getArticleById, patchArticleVotesInc, patchArticleVotesDec } from "../utils/api"

export default function Votes({ article_id }) {
  const [votes, setVotes] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getArticleById(article_id)
      .then(({ data: { article } }) => {
        setVotes(article.votes)
        console.log(votes)
      })
  }, [article_id])

  function handleVoteInc() {

    if (hasVoted) {
      return
    }

    setVotes((votes) => {
      console.log(votes, "here")
      return votes + 1
    })

    patchArticleVotesInc(article_id)
      .catch((err) => {
        setVotes((votes) => {
          return votes - 1
        })
      })
      .then(() => {
        setHasVoted(true)
      })
  }

  function handleVoteDec() {

    if (hasVoted) {
      return
    }

    setVotes((votes) => {
      console.log(votes, "here")
      return votes - 1
    })

    patchArticleVotesDec(article_id)
      .catch((err) => {
        setVotes((votes) => {
          return votes + 1
        })
      })
      .then(() => {
        setHasVoted(true)
      })
  }

  return (
    <>
      <button onClick={() => {
        handleVoteInc()
      }}>Upvote {String(votes)}</button>

      <button onClick={() => {
        handleVoteDec()
      }}>Downvote {String(votes)}</button>

      {hasVoted ? (
        <p>You voted!</p>
      ) : null}

      {error ? <p>There was an error communicating to the server</p> : null}
    </>

  )
}