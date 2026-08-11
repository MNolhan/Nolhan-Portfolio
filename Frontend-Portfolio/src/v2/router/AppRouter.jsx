import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollWatcher from '../components/ui/scrollwatcher'
import Header from '../components/layouts/header'
import Home from '../pages/home'
import Apropos from '../pages/apropos'
import Services from '../pages/services'
import Stack from '../pages/stack'
import Parcours from '../pages/parcours'
import Projects from '../pages/projects'
import Loader from '../components/ui/loader'
import Contact from '../pages/contact'
import Footer from '../components/layouts/footer'
import Login from '../pages/login'
import Signup from '../pages/signup'
import Carroursel from '../components/layouts/carroursel'
import PublicOnlyRoute from '../components/routing/PublicOnlyRoute'
import PagenotFound from '../components/layouts/pagenotfound'
import ReloadTracker from '../components/analytics/ReloadTracker'
import Banniere from '../components/layouts/banniere'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollWatcher />
      <Loader />
      <ReloadTracker />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Banniere />
              <Home />
              <Carroursel />
              <Apropos />
              <Services />
              <Stack />
              <Parcours />
              <Projects />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route path="/*" element={<PagenotFound />} />
      </Routes>
    </BrowserRouter>
  )
}