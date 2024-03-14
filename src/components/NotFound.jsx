import { Link } from "react-router-dom"

export default function NotFound({ err }) {
  return (
    <>
      <h2>Page not found: {err}</h2>
      <h3>Click <Link to={"/"}> here </Link>
      to go home </h3>
      
    </>
  )
}