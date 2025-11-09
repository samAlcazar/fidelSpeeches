import { Route, Routes } from 'react-router'
import App from '../pages/App'
import Home from '../pages/home/Home'
import Speech from '../pages/speech/Speech'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='speech/:id' element={<Speech />} />
      </Route>
    </Routes>
  )
}

export default Router
