import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UsernameKey = 'Uname'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getUsername() {
  return Cookies.get(UsernameKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setUsername(username) {
  return Cookies.set(UsernameKey, username)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
