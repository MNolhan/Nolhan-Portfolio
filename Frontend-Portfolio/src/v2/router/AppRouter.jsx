import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollWatcher from '../components/ui/scrollwatcher'
import Header from '../components/layouts/header'
import Home from '../pages/home'
import Apropos from '../pages/apropos'
import Services from '../pages/services'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollWatcher />
      <Header />
      <Home />
      <Apropos />
      <Services />
    </BrowserRouter>
  )
}