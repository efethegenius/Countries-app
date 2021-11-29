import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import "./dropdown.css";
import { FaAngleLeft } from "react-icons/fa";
import "animate.css";

const url = "https://restcountries.com/v2/all";

export const Countries = ({ handleModal }) => {
  const { loading, data } = useFetch(url);
  const [search, setSearch] = useState("");

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  const filtered = search
    ? data.filter(
        (nation) =>
          nation.name.toLowerCase().includes(search.toLowerCase()) ||
          nation.region.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  const handleAfrica = () => {
    setSearch("Africa");
  };
  const handleAmericas = () => {
    setSearch("Americas");
  };
  const handleAsia = () => {
    setSearch("Asia");
  };
  const handleEurope = () => {
    setSearch("Europe");
  };
  const handleOceania = () => {
    setSearch("Oceania");
  };

  return (
    <section className="all-countries">
      <nav className="search-nav">
        <Link to="/" className="btn-back back-countries">
          <FaAngleLeft />
        </Link>
        <h3>Where in the World?</h3>
      </nav>
      <section className="filter-container">
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          placeholder="Search for a country. . ."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="container">
          <input type="checkbox" name="" id="" className="btns" />
          <div className="list">
            <button onClick={handleAfrica}>Africa</button>
            <button onClick={handleAmericas}>Americas</button>
            <button onClick={handleAsia}>Asia</button>
            <button onClick={handleEurope}>Europe</button>
            <button onClick={handleOceania}>Oceania</button>
          </div>
        </div>
      </section>
      <section className="countries-list">
        {filtered.map((country) => {
          const { name, capital, region, population, flag, alpha2Code } =
            country;

          return (
            <div
              key={alpha2Code}
              className="countries animate__animated animate__fadeIn"
              onClick={handleModal}
            >
              <Link to={`/country/${alpha2Code}`}>
                <article>
                  <img src={flag} alt="" className="flags" />
                  <div className="country-details">
                    <h1>{name}</h1>
                    <p>
                      <span>Population: </span> {formatMoney(population)}
                    </p>
                    <p>
                      <span>Region: </span>
                      {region}
                    </p>
                    <p>
                      <span>capital: </span>
                      {capital}
                    </p>
                    <h6>Tap to know more</h6>
                  </div>
                </article>
              </Link>
            </div>
          );
        })}
      </section>
      <p className="loading">{`${loading ? "loading..." : ""}`}</p>
    </section>
  );
};
