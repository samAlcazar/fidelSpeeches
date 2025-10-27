import { Outlet } from 'react-router'
import Nav from '../components/molecules/Nav'

const App = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
