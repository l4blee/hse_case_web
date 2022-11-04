import { lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
// import { createTheme } from '@suid/material'

const Main = lazy(() => import('./pages/Main'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

// const theme = createTheme({
//   components: {
//     MuiToggleButtonGroup: {
      
//     }
//   }
// })

export default function App() {
  return (
    <Routes>
      <Route path='/' component={Main}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Routes>
  )
}
