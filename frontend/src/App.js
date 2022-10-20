import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeView from "./views/HomeView";
import EventsView from "./views/EventsView";
import Footer from "./components/Footer";
import Contact from "./views/Contact";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomeView></HomeView>}></Route>
          <Route path="/events" element={<EventsView></EventsView>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
