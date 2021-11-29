import React, { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { Link, useParams } from "react-router-dom";
import "./country.css";
import { FaAngleLeft } from "react-icons/fa";
import { facts } from "./data";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const url = "https://restcountries.com/v2/all";
export const Country = ({ isModal }) => {
  const { loading, data } = useFetch(url);
  const [name, setName] = useState("");
  const [region, setRegion] = useState(null);
  const [nativeName, setNativeName] = useState(null);
  const [subregion, setSubregion] = useState(null);
  const [capital, setCapital] = useState(null);
  const [population, setPopulation] = useState(null);
  const [callingCodes, setCallingCodes] = useState(null);
  const [flag, setFlag] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const { alpha2Code } = useParams();

  let funFacts = facts[Math.floor(Math.random() * facts.length)];

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  useEffect(() => {
    let unmounted = false;
    console.log("Running effect to fetch data");

    setTimeout(() => {
      console.log("Data loaded for page");

      const newCountry = data.find(
        (country) => country.alpha2Code === alpha2Code
      );
      if (!unmounted) {
        setName(newCountry.name);
        setNativeName(newCountry.nativeName);
        setRegion(newCountry.region);
        setSubregion(newCountry.subregion);
        setCapital(newCountry.capital);
        setCallingCodes(newCountry.callingCodes);
        setFlag(newCountry.flag);
        setPopulation(newCountry.population);
        setCurrencies(newCountry.currencies);
        setLanguages(newCountry.languages);
      }
    }, 3000);

    return () => {
      unmounted = true;
    };
  }, [alpha2Code, data]);

  return (
    <section className="country-container">
      <div className="full-country">
        <div className={`${isModal ? "modal  show-modal" : "modal"}`}>
          <p>Loading, please wait</p>
          <Loader type="Watch" color="white" height={30} width={30} />
          <h4>Little Fun Facts</h4>
          <p id="modal-facts">{funFacts}</p>
        </div>
        <img src={flag} alt="flag" />
        <section className="country-details country-details-b">
          <div>
            <h1 className="title">{name} </h1>
            <p>
              <span>Native Name: </span> {nativeName}
            </p>
            <p>
              <span>Population: </span> {formatMoney(population)}
            </p>
            <p>
              <span>Region: </span> {region}
            </p>
            <p>
              <span>Sub-Region: </span> {subregion}
            </p>
            <p>
              <span>Capital: </span> {capital}
            </p>
          </div>
          <div className="country-details2">
            <p>
              <span>Calling code: </span> +{callingCodes}
            </p>
            <div>
              {currencies.map((currency) => (
                <p>
                  {" "}
                  <span>Currency: </span>
                  {currency.name}, {currency.symbol}
                </p>
              ))}
            </div>
            <div className="languages">
              <span>Languages: </span>
              {languages.map((language) => (
                <p>
                  {" "}
                  {`${
                    name === "Nigeria"
                      ? language.name + " , Yoruba, Hausa, Igbo"
                      : language.name + ","
                  }`}{" "}
                </p>
              ))}
            </div>
          </div>
        </section>
        <div className="main-fact">
          <p>
            {
              facts.filter((fact) =>
                fact.toLowerCase().includes(name.toLowerCase())
              )[0]
            }
          </p>
        </div>

        <h2>{`${loading ? "loading..." : ""}`}</h2>
      </div>
      <div className="nav">
        <Link to="/explore" className="btn-back">
          <FaAngleLeft />
        </Link>
      </div>
    </section>
  );
};
