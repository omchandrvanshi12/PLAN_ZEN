const USERS_KEY = 'planzen-users-v1'
const SESSION_KEY = 'planzen-session-v1'

function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] } catch { return [] }
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
}

export function registerUser({ name, email, password }) {
  const users = readUsers()
  const normalizedEmail = email.trim().toLowerCase()
  if (users.some((user) => user.email === normalizedEmail)) throw new Error('An account with this email already exists.')
  const user = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, password, isOwner: users.length === 0, registeredAt: new Date().toISOString() }
  const nextUsers = [...users, user]
  localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers))
  const session = sessionFor(user)
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function loginUser({ email, password }) {
  const user = readUsers().find((item) => item.email === email.trim().toLowerCase() && item.password === password)
  if (!user) throw new Error('Email or password is incorrect.')
  const session = sessionFor(user)
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function logoutUser() { localStorage.removeItem(SESSION_KEY) }

export function getRegisteredUsers() {
  return readUsers().map(({ password, ...safeUser }) => safeUser).sort((a, b) => b.registeredAt.localeCompare(a.registeredAt))
}

function sessionFor(user) { return { id: user.id, name: user.name, email: user.email, isOwner: user.isOwner } }
