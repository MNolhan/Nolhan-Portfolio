import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollWatcher from '../components/ui/scrollwatcher'
import Header from '../components/layouts/header'
import Home from '../pages/home'
import Apropos from '../pages/apropos'
import Services from '../pages/services'
import Stack from '../pages/stack'
import Parcours from '../pages/parcours'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollWatcher />
      <Header />
      <Home />
      <Apropos />
      <Services />
      <Stack />
      <Parcours />
    </BrowserRouter>
  )
}