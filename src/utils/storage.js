const TASKS_KEY = 'planzen-tasks-v1'
const PREFS_KEY = 'planzen-preferences-v1'

export const seedTasks = [
  { id: 'seed-1', title: 'Current Electricity', subject: 'Physics', description: 'Revise Kirchhoff laws and solve 10 mixed problems.', date: new Date().toISOString().slice(0, 10), startTime: '19:00', endTime: '20:30', priority: 'High', completed: false, planDay: 1 },
  { id: 'seed-2', title: 'Functions & Relations', subject: 'Mathematics', description: 'Complete the assigned problem set.', date: new Date().toISOString().slice(0, 10), startTime: '16:30', endTime: '17:30', priority: 'Medium', completed: true, planDay: 1 },
  { id: 'seed-3', title: 'Deep work block', subject: 'Personal', description: 'Read 25 pages of the current book.', date: new Date().toISOString().slice(0, 10), startTime: '21:00', endTime: '21:30', priority: 'Low', completed: false, planDay: 1 },
  { id: 'seed-4', title: 'Chemical Kinetics', subject: 'Chemistry', description: 'Review reaction rate graphs and formulas.', date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), startTime: '18:00', endTime: '19:00', priority: 'Medium', completed: false, planDay: 2 },
]

export function loadTasks(userId) {
  const userKey = `${TASKS_KEY}-${userId}`
  const saved = localStorage.getItem(userKey)
  if (!saved && !userId) return seedTasks
  if (!saved && userId) {
    const legacy = localStorage.getItem(TASKS_KEY)
    if (legacy) { localStorage.setItem(userKey, legacy); return JSON.parse(legacy) }
  }
  if (saved) return JSON.parse(saved)
  localStorage.setItem(userKey, JSON.stringify(seedTasks))
  return seedTasks
}

export function saveTasks(tasks, userId) {
  localStorage.setItem(`${TASKS_KEY}-${userId}`, JSON.stringify(tasks))
}

export function loadPreferences(userId) {
  try { return JSON.parse(localStorage.getItem(`${PREFS_KEY}-${userId}`)) || { name: 'Om', notifications: false } } catch { return { name: 'Om', notifications: false } }
}

export function savePreferences(preferences, userId) {
  localStorage.setItem(`${PREFS_KEY}-${userId}`, JSON.stringify(preferences))
}
