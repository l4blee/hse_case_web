import { lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
// import { createTheme } from '@suid/material'

const Main = lazy(() => import('./pages/Main'))

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
    </Routes>
  )
}
