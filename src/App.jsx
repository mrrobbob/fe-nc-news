import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Articles from './components/Articles'
import SingleArticle from "./components/SingleArticle"
import SignIn from './components/SignIn'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/account" element={<SignIn/>}/>
        <Route path="/" element={<Articles/>}/>
        <Route path="/articles/:article_id" element={<SingleArticle/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
