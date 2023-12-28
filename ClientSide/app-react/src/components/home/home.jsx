import React from "react";
import Content from "./sectionHome/content";
import ServeurBar from "./sectionHome/serveurBar";
import BarreLat from "./sectionHome/barreLat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Bienvenue à toi !</h1>
      <div id="barreServeur">
        <ServeurBar />
      </div>
      <div id="barreLaterale">
        <BarreLat />
      </div>
      <div id="content">
        <Content />
      </div>
    </>
  );
};

export default Home;
