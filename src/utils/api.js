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

export function patchArticleVotesInc (articleId) {
  const patchObj = {inc_votes: 1}
  return newsApi.patch(`/articles/${articleId}`, {modifier: patchObj})
}

export function patchArticleVotesDec (articleId) {
  const patchObj = {inc_votes: -1}
  return newsApi.patch(`/articles/${articleId}`, {modifier: patchObj})
}

export function getAllUsers () {
  return newsApi.get("/users")
}

export function postComment (username, body, article_id) {
  const postBody = {
    username,
    body
  }

  return newsApi.post(`/articles/${article_id}/comments`, {newComment: postBody})
}