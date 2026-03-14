import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scroll from "../components/ui/scrollwatcher";
import Header from "../components/layouts/header"
import Foot from "../components/layouts/footer"
import Home from "../pages/home";
import Aboutme from "../pages/aboutme";
import Service from "../pages/service";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Scroll />
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      <Aboutme />
      <Service />
      <Foot />
    </BrowserRouter>
  );
}