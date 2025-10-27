import { Route, Routes } from 'react-router'
import App from '../pages/App'
import Home from '../pages/home/Home'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default Router
