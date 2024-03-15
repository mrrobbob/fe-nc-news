export default function SingleArticleBody({article: { title, author, body, article_img_url}}) {
  return (
    <div id="single-article">
      <h1>{title}</h1>
      <h3>By {author}</h3>
      <p>{body}</p>
      <img src={article_img_url}/>
    </div>
  )
}