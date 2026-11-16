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
import PagenotFound from '../components/layouts/pagenotfound'
import ReloadTracker from '../components/analytics/ReloadTracker'
import ProjectDetails from '../pages/projects_details'
import Profil from '../pages/profil'
import ProjectsCreate from '../pages/projects_create'
import ProjectsEdit from '../pages/projects_edit'

import PublicOnlyRoute from '../components/routing/PublicOnlyRoute'
import AdminOnlyRoute from '../components/routing/AdminOnlyRoute'

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
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
              <Footer />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
              <Footer />
            </PublicOnlyRoute>
          }
        />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/*" element={<PagenotFound />} />
        <Route 
          path="/projects/new"
          element={
            <AdminOnlyRoute>
              <ProjectsCreate />
              <Footer />
            </AdminOnlyRoute>
          }
        />
        <Route 
          path="/projects/:id/edit"
          element={
            <AdminOnlyRoute>
              <ProjectsEdit />
              <Footer />
            </AdminOnlyRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
