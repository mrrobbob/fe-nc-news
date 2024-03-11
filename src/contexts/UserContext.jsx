import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({
    username: "",
    avatar_url: "",
    name: ""
  })

  const isLoggedIn = Boolean(user.username)

  return (
    <UserContext.Provider value={{user, setUser, isLoggedIn}}>
      {children}
    </UserContext.Provider>
  )
}