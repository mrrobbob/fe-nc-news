import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Articles from './components/Articles'
import SingleArticle from "./components/SingleArticle"

function App() {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Articles/>}/>
        <Route path="/articles/:article_id" element={<SingleArticle/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
