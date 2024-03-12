import axios from 'axios'

const newsApi = axios.create({
  baseURL: "https://nc-news-w1bs.onrender.com/api"
})

export function getAllArticles () {
  return newsApi.get('/articles')
}

export function getArticleById (articleId) {
  return newsApi.get(`/articles/${articleId}`)
}

export function getCommentsByArticleId (articleId) {
  return newsApi.get(`/articles/${articleId}/comments`)
}