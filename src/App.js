import "./App.css";
import { Countries } from "./Countries";
import { Header } from "./Header";
import { Error } from "./Error";
import { Country } from "./Country";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CountryFacts } from "./CountryFacts";
import { Quiz } from "./Quiz";

function App() {
  const [isModal, setIsModal] = useState(false);
  const handleModal = () => {
    setIsModal(true);
    setTimeout(function () {
      setIsModal(false);
    }, 8000);
  };
  useEffect(() => {
    document.title = "Countries App";
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        <Route exact path="/explore">
          <Countries
            handleModal={handleModal}
            isModal={isModal}
            setIsModal={setIsModal}
          />
        </Route>
        <Route exact path="/facts">
          <CountryFacts />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
        <Route
          path="/country/:alpha2Code"
          children={
            <Country
              isModal={isModal}
              setIsModal={setIsModal}
              handleModal={handleModal}
            />
          }
        ></Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
