import { Link } from "react-router-dom"
import moment from "moment"
import { formatDate } from "../utils/utils"

export default function ArticleCard ({article}) {
  return (
    <>
      <Link to={`/articles/${article.article_id}`} key={article.article_id}>
        <h2>{article.title}</h2>
      </Link>
      <h3>By {article.author} on the topic of {article.topic}</h3>
      <h3>Published on {formatDate(article.created_at)}</h3>
    </>
  )
}