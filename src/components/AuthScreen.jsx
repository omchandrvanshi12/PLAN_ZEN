import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { loginUser, registerUser } from '../utils/auth'

export default function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('register')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  function submit(event) {
    event.preventDefault(); setError(''); setBusy(true)
    try { onAuthenticated(mode === 'register' ? registerUser(form) : loginUser(form)) } catch (requestError) { setError(requestError.message) } finally { setBusy(false) }
  }
  return <main className="auth-shell"><div className="auth-brand"><div className="brand-mark">P</div><div><strong>PLAN</strong><span>ZEN</span></div></div><section className="auth-card"><div className="auth-orbit" /><span className="eyebrow">PLAN SMART. STAY CONSISTENT.</span><h1>{mode === 'register' ? 'Your next chapter starts here.' : 'Welcome back to your focus.'}</h1><p className="auth-lede">A calmer way to turn ambitious plans into repeatable days.</p><div className="auth-tabs"><button className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError('') }}>Create account</button><button className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError('') }}>Sign in</button></div><form onSubmit={submit}>{mode === 'register' && <label><UserRound size={15} />Full name<input name="name" value={form.name} onChange={update} placeholder="Your name" required /></label>}<label><Mail size={15} />Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label><label><LockKeyhole size={15} />Password<input type="password" name="password" value={form.password} onChange={update} placeholder="At least 6 characters" minLength="6" required /></label>{error && <div className="auth-error">{error}</div>}<button className="button button-primary auth-submit" disabled={busy}>{mode === 'register' ? 'Create my workspace' : 'Enter workspace'} <ArrowRight size={16} /></button></form><small className="auth-note">Your planner data is kept separate from every other account on this device.</small></section></main>
}
