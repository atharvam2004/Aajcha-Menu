// *****************************
// @author - Attharva Meher  **
// ****************************

import React, { useState, useEffect } from "react";
import Card from "./Card";

const SearchMenu = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("https://codies-mess.vercel.app/find-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menu: query }),
    })
      .then((res) => res.json())
      .then((response) => {
        let menuData = response.data;
        menuData.sort(function (a, b) {
          return b.stars - a.stars;
        });
        setResults(menuData);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container animate__animated animate__fadeIn">
      <form
        className="form-inline d-flex mt-3 justify-content-center"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control search mx-3"
          type="search"
          placeholder="Search Food"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary mx-3">
          Search
        </button>
      </form>
      {results.length > 0 && (
        <>
          <h3 className="mb-3 mt-3 py-1">Search Result: </h3>
          <div className="row m-auto">
            {results.map((element) => {
              return (
                <div className="col-12 col-md-4 col-lg-3 mx-2">
                  <Card
                    email={element.email}
                    name={element.name}
                    menu={element.menu}
                    price={element.price}
                    stars={element.stars}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      {results.length == 0 && <h3 className="mb-3 mt-3 py-1"> No Results </h3>}
    </div>
  );
};

export default SearchMenu;
