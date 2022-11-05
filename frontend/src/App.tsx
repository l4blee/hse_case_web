import { lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'

const Main = lazy(() => import('./pages/Main'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Personal = lazy(() => import('./pages/Personal'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))

export default function App() {
  return (
    <Routes>
      <Route path='/' component={Main}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/personal' component={Personal}/>
      <Route path='/admin' component={AdminPanel}/>
    </Routes>
  )
}
