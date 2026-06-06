import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scroll from "../components/ui/scrollwatcher";
import Header from "../components/layouts/header";
import Foot from "../components/layouts/footer";
import Home from "../pages/home";
import Aboutme from "../pages/aboutme";
import Service from "../pages/service";
import Project from "../pages/project";
import Contact from "../pages/contact";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Scroll />
      <Header />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Aboutme />
        <Service />
        <Project />
        <Contact />
      </div>
      <Foot />
    </BrowserRouter>
  );
}
