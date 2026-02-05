import HomePage from './pages/Home'
import SignupPage from './pages/auth/Signup'
import SigninPage from './pages/auth/Signin'
import ProfilePage from './pages/profile-menu/Profile'
import MyHustles from './pages/MyHustles'
import ProgressPage from './pages/progress/Progress'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

function App() {
return (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path = "/my-hustles" element={<MyHustles />}/>
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </div>
    <Analytics />
  </Router>
)
}

export default App