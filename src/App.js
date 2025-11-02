import React from "react";
import PartyDetails from "./components/PartyDetails/partyDetails";
import RSVPForm from "./components/RSVPForm/RSVPForm";
import Footer from "./components/Footer/footer";
import HeroSection from "./components/HeroSection/index";
import CountdownTimer from "./components/CountdownTimer/countdownTimer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <HeroSection />
      <CountdownTimer />
      <PartyDetails />
      <RSVPForm />
      <Footer />
    </div>
  );
}

export default App;
