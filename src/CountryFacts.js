import React, { useState } from "react";
import { FaRandom, FaAngleLeft } from "react-icons/fa";
import { useEffect } from "react/cjs/react.development";
import { facts } from "./data";
import { Link } from "react-router-dom";

export const CountryFacts = () => {
  let allFacts = facts[Math.floor(Math.random() * facts.length)];
  const [index, setIndex] = useState(0);

  return (
    <section>
      <div className="facts-container">
        <Link to="/" className="btn-back fact-back">
          <FaAngleLeft />
        </Link>
        <h1>Random country facts</h1>
        <div className="full-facts">
          <p id="all-facts">{allFacts}</p>
          <div className="random-btn">
            <button onClick={() => setIndex(index + 1)}>
              <FaRandom />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
