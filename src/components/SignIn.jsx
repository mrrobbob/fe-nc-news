import { useState, useEffect } from "react"
import Loading from "./Loading"
import { getAllUsers } from "../utils/api"
import UserCard from "./UserCard"

export default function SignIn () {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getAllUsers()
      .then(({ data: { users } }) => {
        setUsers(users)
        setIsLoading(false)
      })
  }, [])

  return isLoading ? <Loading /> : (
    <ul>
      {users.map((user, i) => {
        return (
          <UserCard user={user} key={i}/>
        )
      })}
    </ul>
  )
}