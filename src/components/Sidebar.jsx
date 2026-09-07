import { BarChart3, Bell, CalendarDays, CheckSquare, LayoutDashboard, Menu, Settings, X } from 'lucide-react'

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'routine', label: 'Daily Routine', icon: CheckSquare },
  { id: 'planner', label: '30-Day Planner', icon: CalendarDays },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  return <>
    {open && <button className="mobile-overlay" onClick={onClose} aria-label="Close navigation" />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand-row">
        <div className="brand-mark">P</div>
        <div><strong>PLAN</strong><span>ZEN</span></div>
        <button className="icon-button mobile-close" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
      </div>
      <div className="sidebar-label">Workspace</div>
      <nav>
        {navigation.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${activePage === id ? 'active' : ''}`} onClick={() => { onNavigate(id); onClose() }}><Icon size={18} /><span>{label}</span>{id === 'notifications' && <i className="nav-dot" />}</button>)}
      </nav>
      <div className="sidebar-footer"><div className="mini-orbit"><span /></div><div><strong>Focus mode</strong><small>One task at a time</small></div></div>
    </aside>
    <button className="mobile-menu icon-button" onClick={() => onNavigate('__menu')} aria-label="Open navigation"><Menu size={20} /></button>
  </>
}
