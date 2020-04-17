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
  // return Cookies.set(TokenKey, token)
  return Cookies.set(TokenKey, token, { expires: 1 / 144 })
}

export function setUsername(username) {
  // return Cookies.set(UsernameKey, username)
  return Cookies.set(UsernameKey, username, { expires: 1 / 144 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setResetToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 / 24 })
}
