import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Date from "./pages/Date";
import Dateprofile from "./components/Dateprofile";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

function LoginPage() {
  return (
    <>
      <Navbar />
      <Login />
    </>
  );
}

function RegisterPage() {
  return (
    <>
      <Navbar />
      <Register />
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/date" element={<Date />}></Route>
          <Route path="/date-profile" element={<Dateprofile />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
