import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link } from "react-router-dom"

export default function UserCard ({user: {username, name, avatar_url}}) {

  const user = useContext(UserContext)

  function handleClick (e) {
    user.setUser(username)
    e.target.innterHTML = "Logged in"
    console.log(user);
  }

  return (
    <div className="user-card">
      <h2>{username}</h2>
      <h3>Log in as <button onClick={handleClick}>{username}</button></h3>
      <p>{name}</p>
      <img src={avatar_url} width={60}/>
    </div>
  )
}