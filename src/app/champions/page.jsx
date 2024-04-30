"use client"
import { useState } from "react";

import Link from 'next/link';

//JS
import { all_champion_list } from "../data/all_champions";

import SessionLoader from "../helper/SessionLoader";

// Zustand
import { useStoreChampion } from "../store";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function page() {

  SessionLoader();
  const championList = useStoreChampion((state) => state.championList);

  const [Filter, SetFilter] = useState("");
  const [FilterData, SetFilterData] = useState(); // Filters the champions according to the user's choice

  // Reset the Filter
  if (championList && FilterData == undefined) {
    console.log(championList);
    SetFilterData(championList);
  }

  // Champion Filter
  // Research
  const searchFilter = (name) => {
    var filter_champions = championList;

    document
      .getElementsByClassName("activeFilter")[0]
      .classList.remove("activeFilter");
    document
      .getElementsByClassName("btn-tout")[0]
      .classList.add("activeFilter");

    if (name === "") {
      SetFilter("");
      filter_champions = championList;
    } else {
      SetFilter(name);
      filter_champions = championList
        .filter((champion) => {
          return champion.Name.toLowerCase().includes(name.toLowerCase());
        })
        .sort((a, b) => {
          return a.rôle > b.rôle ? 1 : a.rôle < b.rôle ? -1 : 0;
        });
    }
    SetFilterData(filter_champions);
  };

  // Update Role Filter
  const updateFilter = (role, e) => {
    var searchInput = document.getElementById("championspage__search__input");
    searchInput.value = "";

    document
      .getElementsByClassName("activeFilter")[0]
      .classList.remove("activeFilter");
    var filter_champions = championList;

    if (role === "" || Filter === role) {
      SetFilter("");
      filter_champions = championList;
      document
        .getElementsByClassName("btn-tout")[0]
        .classList.add("activeFilter");
    } else {
      if (Filter !== role) {
        e.target.classList.toggle("activeFilter");
        SetFilter(role);
        filter_champions = championList
          .filter((champion) => {
            return champion.Roles.includes(role);
          })
          .sort((a, b) => {
            return a.rôle > b.rôle ? 1 : a.rôle < b.rôle ? -1 : 0;
          });
      }
    }
    SetFilterData(filter_champions);
  };

  return (
    <div className="championspage">
      <section className="championspage__header">
        <div className="championspage__filter">
          <input
            type="text"
            className="championspage__filter__search__input"
            id="championspage__search__input"
            placeholder="Rechercher..."
            onChange={(e) => searchFilter(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className="championspage__filter__class__container">
          <button
            onClick={(e) => updateFilter("", e)}
            className="btn-tout activeFilter"
          >
            Tout
          </button>
          <button
            onClick={(e) => updateFilter("Dégâts", e)}
            className="Dégâts"
          >
            Damage
          </button>
          <button
            onClick={(e) => updateFilter("Flanc", e)}
            className="Flanc"
          >
            Flank
          </button>
          <button
            onClick={(e) => updateFilter("Tank", e)}
            className="Tank"
          >
            Tank
          </button>
          <button
            onClick={(e) => updateFilter("Soutien", e)}
            className="Soutien"
          >
            Healer
          </button>
        </div>
      </section>

      <section className="championspage__champions__grid">
        {FilterData &&
          FilterData.map((champion, key) => (
            <div
              key={key}
              className="championspage__champions__grid__card card__filtered"
            >
              <Link
                href={`/champion/${champion.Name.replace(/ /g, '_')}`}
              >
                <img
                  src={champion.ChampionIcon_URL}
                  alt=""
                  className={`championspage__champions__grid__card__championimage ${champion.Roles}`}
                />
                <div className="championspage__champions__grid__card__name">
                  <p>{champion.Name}</p>
                </div>
              </Link>
            </div>
          ))}
        {championList &&
          FilterData &&
          championList
            .filter(
              (champion) =>
                !FilterData.some(
                  (filteredChampion) =>
                    filteredChampion.Name === champion.Name
                )
            )
            .map((champion, key) => (
                <div
                key={key}
                className="championspage__champions__grid__card card__nofiltered"
              >
                <Link
                  href={`/champion/${champion.Name.replace(/ /g, '_')}`}
                >
                  <img
                    src={champion.ChampionIcon_URL}
                    alt=""
                    className={`championspage__champions__grid__card__championimage ${champion.Roles}`}
                  />
                  <div className="championspage__champions__grid__card__name">
                    <p>{champion.Name}</p>
                  </div>
                </Link>
              </div>
            ))}
      </section>
    </div>
  );
}