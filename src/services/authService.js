const AUTH_KEY = 'eco_sphere_auth'

export function loginUser() {
  localStorage.setItem(AUTH_KEY, 'true')
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY)
}

export function isUserLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === 'true'
}