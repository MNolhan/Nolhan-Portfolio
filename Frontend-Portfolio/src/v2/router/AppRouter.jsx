import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollWatcher from '../components/ui/scrollwatcher'
import Header from '../components/layouts/header'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollWatcher />
      <Header />
    </BrowserRouter>
  )
}