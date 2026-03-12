import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/layouts/header"
import Foot from "../components/layouts/footer"
import Home from "../pages/home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      <Foot />
    </BrowserRouter>
  );
}