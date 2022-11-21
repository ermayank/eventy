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
import SurveyForm from "./views/SurveyForm";
import SurveyChart from "./views/SurveyChart";
import EventsViewSurvey from "./views/EventsViewSurvey";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Thanks from "./views/Thanks";

function App() {
  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AXEe7PlnBX2XzR-FQbJwN8v9TBEgt0TCZpMls38Br8DjuEXo3WJf1o5DD_frRNjkBkT5Wi1UAEi6NEKe",
        }}
      >
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<HomeView></HomeView>}></Route>
            <Route path="/events" element={<EventsView></EventsView>}></Route>
            <Route
              path="/eventssurvey"
              element={<EventsViewSurvey></EventsViewSurvey>}
            ></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route path="/events/:id" element={<EventView></EventView>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route
              path="/survey/:id"
              element={<SurveyForm></SurveyForm>}
            ></Route>
            <Route
              path="/surveychart/:id"
              element={<SurveyChart></SurveyChart>}
            ></Route>
            <Route path="/thanks" element={<Thanks></Thanks>}></Route>
          </Routes>
          <Footer></Footer>
        </Router>
      </PayPalScriptProvider>
    </>
  );
}

export default App;
