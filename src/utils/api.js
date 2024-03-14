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

export function patchArticleVotes (articleId, quantity) {
  const patchObj = {inc_votes: quantity}
  return newsApi.patch(`/articles/${articleId}`, {modifier: patchObj})
}

export function getAllUsers () {
  return newsApi.get("/users")
}

export function postComment (username, body, articleId) {
  const postBody = {
    username,
    body
  }
  return newsApi.post(`/articles/${articleId}/comments`, {newComment: postBody})
}

export function deleteComment (commentId) {
  return newsApi.delete(`/comments/${commentId}`)
}

export function getArticlesByTopic (topic, sortBy, order) {
  return newsApi.get(`/articles?topic=${topic}&sort_by=${sortBy}&order=${order}`)
}

export function getTopics () {
  return newsApi.get("/topics")
}