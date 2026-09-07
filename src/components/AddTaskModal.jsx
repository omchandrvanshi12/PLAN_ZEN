import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { todayKey } from '../utils/taskUtils'

const blank = { title: '', subject: 'Study', description: '', date: todayKey(), startTime: '18:00', endTime: '', priority: 'Medium', planDay: 1, completed: false }

export default function AddTaskModal({ task, defaultDate, defaultPlanDay, onSave, onClose }) {
  const [form, setForm] = useState({ ...blank, ...(task || {}), date: task?.date || defaultDate || todayKey(), planDay: task?.planDay || defaultPlanDay || 1 })
  useEffect(() => { setForm({ ...blank, ...(task || {}), date: task?.date || defaultDate || todayKey(), planDay: task?.planDay || defaultPlanDay || 1 }) }, [task, defaultDate, defaultPlanDay])
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => { event.preventDefault(); if (!form.title.trim()) return; onSave({ ...form, title: form.title.trim(), id: task?.id || crypto.randomUUID() }) }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="task-modal-title"><div className="modal-header"><div><span className="eyebrow">{task ? 'Refine your plan' : 'New focus block'}</span><h2 id="task-modal-title">{task ? 'Edit task' : 'Add a task'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></div><form onSubmit={submit}>
    <label>Task title<input autoFocus name="title" value={form.title} onChange={update} placeholder="e.g. Current Electricity" required /></label>
    <div className="form-grid"><label>Subject / category<input name="subject" value={form.subject} onChange={update} placeholder="Physics" /></label><label>Priority<select name="priority" value={form.priority} onChange={update}><option>Low</option><option>Medium</option><option>High</option></select></label></div>
    <label>Description<textarea name="description" value={form.description} onChange={update} placeholder="What does done look like?" rows="3" /></label>
    <div className="form-grid"><label>Date<input type="date" name="date" value={form.date} onChange={update} required /></label><label>Planner day<input type="number" min="1" max="30" name="planDay" value={form.planDay} onChange={update} /></label></div>
    <div className="form-grid"><label>Start time<input type="time" name="startTime" value={form.startTime} onChange={update} required /></label><label>End time <span className="muted">(optional)</span><input type="time" name="endTime" value={form.endTime} onChange={update} /></label></div>
    <div className="modal-actions"><button type="button" className="button button-ghost" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{task ? 'Save changes' : 'Add to plan'}</button></div>
  </form></section></div>
}
