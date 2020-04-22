import Cookies from 'js-cookie'

const resetTokenKey = 'reset_token'
const refreshTokenKey = 'Refresh-Token'
const TokenKey = 'Admin-Token'
const UsernameKey = 'Uname'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getUsername() {
  return Cookies.get(UsernameKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 0.00347222 }) // 5 minute
}

export function setRefreshToken(token) {
  return Cookies.set(refreshTokenKey, token, { expires: 1 })
}

export function getRefreshToken() {
  return Cookies.get(refreshTokenKey)
}

export function setUsername(username) {
  return Cookies.set(UsernameKey, username, { expires: 0.00347222 }) // 5 minute
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setResetToken(token) {
  return Cookies.set(resetTokenKey, token, { expires: 1 / 24 })
}

export function getResetToken() {
  return Cookies.get(resetTokenKey)
}
