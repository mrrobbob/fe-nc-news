import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export default function Header() {
  const { user } = useContext(UserContext)

  return (
    <>
    <div id="header">
      <li><Link to="/">
        <h2>NC News</h2>
      </Link></li>
      <li className="right">{user ? (
          <Link to="/post">
            <p>Post an Article</p>
          </Link>
      ) : <p>Sign in to post</p>}</li>
      
      
      <li className="right">{user ? (
        
          <p>Logged in as <Link to="/account">{user}</Link></p>
      ) : (
        <Link to="/account">
          <p>Sign In</p>
        </Link>
      )}</li>

    </div>
    </>
  )
}