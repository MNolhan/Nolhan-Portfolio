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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollWatcher />
      <Loader />
      <Header />
      <Home />
      <Apropos />
      <Services />
      <Stack />
      <Parcours />
      <Projects />
      <Contact />
    </BrowserRouter>
  )
}