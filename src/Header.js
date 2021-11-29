import React, { useState, useEffect } from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaCircle,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "animate.css";
import { useFetch } from "./useFetch";
import { photos } from "./data";

const url = "https://restcountries.com/v2/all";
export const Header = () => {
  const { loading, data } = useFetch(url);
  const [index, setIndex] = useState(0);

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let worldPopulation = data.reduce((currentPopulation, pop) => {
    return pop.population + currentPopulation;
  }, 0);

  let homePhotos = photos[Math.floor(Math.random() * photos.length)];

  useEffect(() => {
    const lastIndex = photos.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 6000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="header">
      <img src={homePhotos} alt="photos" id="home-photos" />
      <nav className="navbar">
        <h1 className="animate__animated animate__fadeInDown animate__delay-3s">
          CountrieS
        </h1>
      </nav>
      <div className="population animate__animated animate__fadeInDown animate__delay-3s">
        <p>
          <span>Live World Population: </span>{" "}
          {`${loading ? "loading..." : formatMoney(worldPopulation)}`}
          {/* <div className="Blink"> */}
          <FaCircle className="Blink" />
          {/* </div> */}
        </p>
      </div>
      <div className="home-info">
        <h1 className="animate__animated animate__lightSpeedInLeft">
          Discover All Countries and Regions on Earth!
        </h1>
        <p className="animate__animated animate__fadeInLeft animate__delay-1s">
          Get to know about every single nation on the planet, including 1000+
          facts about all nations, population, flags, and much more!
        </p>
        <div className="home-buttons animate__animated animate__fadeInUp animate__delay-2s">
          <Link
            to="/explore"
            className="home-btn animate__animated animate__pulse animate__delay-5s"
          >
            Explore <FaLongArrowAltLeft />
          </Link>
          <Link
            to="/facts"
            className="home-btn animate__animated animate__pulse animate__delay-5s"
          >
            Facts <FaLongArrowAltRight />
          </Link>
        </div>
        <section className="social-links animate__animated animate__fadeInUp animate__delay-4s">
          <a
            href="https://www.linkedin.com/in/efe-samuel-7997a779/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.twitter.com/efethegenius"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/efethegenius/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </section>
      </div>
      <div className="cont-container">
        {/* <h1>countries</h1> */}
        <div className="continents">
          <h1 className="country-head">Africa</h1>
          <h1 className="country-head">Antartica</h1>
          <h1 className="country-head">Asia</h1>
          <h1 className="country-head">Europe</h1>
          <h1 className="country-head">North America</h1>
          <h1 className="country-head">Oceania</h1>
          <h1 className="country-head">South America</h1>
        </div>
      </div>
    </section>
  );
};
