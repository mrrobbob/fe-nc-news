export default function SingleArticleBody({article: { title, author, body}}) {
  return (
    <>
      <h1>{title}</h1>
      <h3>By {author}</h3>
      <p>{body}</p>


    </>

  )

}