import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export default function Header() {
  const { user } = useContext(UserContext)

  return (
    <nav>
      <Link to="/">
        NC news
      </Link>
      {user ? (
        <><p>Logged in as {user}</p>
          <Link to="/post">
            Post an Article
          </Link></>

      ) : <p>Please log in to post</p>}
      {Boolean(user.username) ? (
        <Link to="/account">
          <p>{user.username}</p>
          <img src={user.avatar_url} />
        </Link>
      ) : (
        <Link to="/account">
          <p>Sign In</p>
        </Link>
      )}

    </nav>
  )
}