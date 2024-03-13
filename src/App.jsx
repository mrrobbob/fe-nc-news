import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Articles from './components/Articles'
import SingleArticle from "./components/SingleArticle"
import SignIn from './components/SignIn'
import OneTopic from './components/OneTopic'
import TopicsNav from './components/TopicsNav'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <TopicsNav/>
      <Routes>
        <Route path="/account" element={<SignIn/>}/>
        <Route path="/" element={<Articles/>}/>
        <Route path="/articles/:article_id" element={<SingleArticle/>}/>
        <Route path="/articles/topics/:topic" element={<OneTopic/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
