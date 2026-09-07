export const todayKey = () => new Date().toISOString().slice(0, 10)

export function taskStatus(task, now = new Date()) {
  if (task.completed) return 'completed'
  const due = new Date(`${task.date}T${task.endTime || task.startTime || '23:59'}`)
  return due < now ? 'missed' : 'pending'
}

export function formatTime(time) {
  if (!time) return 'Anytime'
  const [hour, minute] = time.split(':')
  const date = new Date()
  date.setHours(Number(hour), Number(minute))
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
}

export function getStats(tasks, date = todayKey()) {
  const daily = tasks.filter((task) => task.date === date)
  const completed = daily.filter((task) => task.completed).length
  const missed = daily.filter((task) => taskStatus(task) === 'missed').length
  return { total: daily.length, completed, missed, pending: Math.max(daily.length - completed - missed, 0), progress: daily.length ? Math.round((completed / daily.length) * 100) : 0 }
}

export function getNextTask(tasks) {
  return tasks.filter((task) => !task.completed && taskStatus(task) === 'pending').sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))[0]
}
