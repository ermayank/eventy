import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeView from "./views/HomeView";
import EventsView from "./views/EventsView";
import EventView from "./views/EventView";
import Footer from "./components/Footer";
import Contact from "./views/Contact";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomeView></HomeView>}></Route>
          <Route path="/events" element={<EventsView></EventsView>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/events/:id" element={<EventView></EventView>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
