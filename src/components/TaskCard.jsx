import { Check, Clock3, Pencil, Trash2 } from 'lucide-react'
import { formatTime, taskStatus } from '../utils/taskUtils'

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const status = taskStatus(task)
  return <article className={`task-card ${status}`}>
    <button className={`task-check ${task.completed ? 'checked' : ''}`} onClick={() => onToggle(task.id)} aria-label={task.completed ? 'Mark task pending' : 'Mark task complete'}>{task.completed && <Check size={15} />}</button>
    <div className="task-main"><div className="task-title-row"><h3>{task.title}</h3><span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span></div><p>{task.subject} <span className="dot-separator">•</span> {task.description || 'No description added.'}</p><div className="task-time"><Clock3 size={13} /> {formatTime(task.startTime)}{task.endTime && ` - ${formatTime(task.endTime)}`}</div></div>
    <div className="task-actions"><button className="icon-button" onClick={() => onEdit(task)} aria-label="Edit task"><Pencil size={15} /></button><button className="icon-button danger-hover" onClick={() => onDelete(task.id)} aria-label="Delete task"><Trash2 size={15} /></button></div>
  </article>
}
