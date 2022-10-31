import { lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'

const Main = lazy(() => import('./pages/Main/Main'))

export default function App() {
  return (
    <Routes>
      <Route path='/' component={Main}/>
    </Routes>
  )
}
