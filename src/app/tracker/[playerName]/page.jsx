"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// JS
import SessionLoader from "../../helper/SessionLoader";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function TrackerPageWithPlayerName({ Component, pageProps }) {
    SessionLoader();

    const location = usePathname().replace(/_/g, " ");
  
    const [player, setPlayer] = useState("");
    const [matchList, setMatchList] = useState();
    const [playerChampionRank, setPlayerChampionRank] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
  
    const [inputValue, setInputValue] = useState(location.substring(9));
    const [livematch, setLivematch] = useState("");
  
    const profileRedirect = (event) => {
      if (event) {
        event.preventDefault();
      }
      if(inputValue != location.substring(9) && inputValue != ""){
        window.location.href = `/tracker/${inputValue}`;
      }
    };

  return (
    <div className="tracker__page">
      <form className="tracker__page__form" action="" onSubmit={profileRedirect}>
        <div className="tracker__page__form__search">
          <input
            className="tracker__page__form__search__input"
            type="text"
            id="input"
            value={inputValue}
            onChange={() => setInputValue(event.target.value)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="tracker__page__form__search__icon"
          />
        </div>
          <input type="submit" id="post" value="Envoyer" className="tracker__page__form__submit"/>
      </form>
      <p className="development_in_progress"> En cours de développement !</p>
      {/* <section>
        <div> Main Info </div>
      </section>
      <section>
        <div> Info de Saison </div>
      </section>
      <section>
        <div> Historique </div>
      </section> */}
    </div>
  )
}