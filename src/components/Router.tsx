import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Post from './PostList'
import PostDetail from './PostDetail'
import Header from './Header'
import Login from './Login'
import { UserContext, useCustomContext } from '../utils/customHook'

export default function Router() {
  const { state, login, logout } = useCustomContext()
  return (
    <UserContext.Provider value={{ state, login, logout }}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route
              path={state.user.id !== -1 ? '/' : '/home'}
              element={<App />}
            />
            <Route
              path={state.user.id !== -1 ? '/login' : '/'}
              element={<Login />}
            />
            <Route path="/post">
              <Route path="all" element={<Post />} />
              <Route path=":id" element={<PostDetail />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
