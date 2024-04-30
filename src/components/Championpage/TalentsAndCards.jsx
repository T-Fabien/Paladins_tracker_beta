import { useState } from "react";

// Components
import CommonChampionCard from "../CommonChampionCard";

// Zustand
import { useStoreSession } from "@/app/store";

// React Query
import { useQuery } from "@tanstack/react-query";

// API
import { getChampionCards } from "@/api/getChampionCards";

export default function TalentsAndCards({ champion_id }) {
  const [cardLevel, setCardLevel] = useState(1);

  const sessionId = useStoreSession((state) => state.sessionId);
  const championId = champion_id;

  const championTalents = [];
  const championCommonCards = [];

  // Description Legendary Cards
  var cardCategorie = "";
  var cardDescription = "";

  const { data: championCardData } = useQuery({
    queryKey: ["championsCards"],
    queryFn: () => getChampionCards(sessionId, championId),
    enabled:
      sessionId != "" &&
      sessionId != undefined &&
      championId != null &&
      championId != undefined,
    onError: (error) => {
      console.error(
        "Erreur de récupération des items / talents du champions : ",
        error
      );
    },
  });

  // Sorting talents and common cards

  if (championCardData) {
    championCardData.map((championCard) => {
      if (championCard.rarity.includes("Legendary")) {
        championTalents.push(championCard);
      }
      if (championCard.rarity.includes("Common")) {
        championCommonCards.push(championCard);
      }
    });
    championCommonCards.sort((a, b) =>
      a.card_description.localeCompare(b.card_description)
    );
  }

  // Change the Rank of the card

  const handleSelectChange = (event) => {
    setCardLevel(parseInt(event.target.value));
  };

  return (
    <div className="champion__page__cards" id="talents">
      <a href="#talents">Talents</a>
      <div className="champion__page__cards__talent">
        {championTalents &&
          championTalents.map((talent) => {
            if (talent.card_description.includes("]")) {
              cardCategorie =
                talent.card_description.split("]")[0].substring(1) + " : ";
              cardDescription = talent.card_description
                .split("]")[1]
                .substring(1);
            } else {
              cardCategorie = "";
              cardDescription = talent.card_description;
            }
            return (
              <div
                className="champion__page__cards__talent__container"
                key={talent.card_id1}
              >
                <img
                  src={talent.championTalent_URL}
                  alt=""
                  className="champion__page__cards__talent__container__img"
                />
                <h3 className="champion__page__cards__talent__container__title">
                  {talent.card_name}
                </h3>
                <p className="champion__page__cards__talent__container__text">
                  <span>{cardCategorie}</span>
                  {cardDescription}
                </p>
              </div>
            );
          })}
      </div>

      <div id="cards">
        <a href="#cards">Cards</a>
        <div className="champion__page__cards__rank__container">
          <p>Niveaux des cartes</p>
          <select value={cardLevel} onChange={handleSelectChange}>
            {[1, 2, 3, 4, 5].map((level) => (
              <option key={level} value={level}>
                Rank {level}
              </option>
            ))}
          </select>
        </div>

        <div className="champion__page__cards__common">
          {championCommonCards &&
            championCommonCards.map((commonCard) => {
              return (
                <CommonChampionCard card={commonCard} cardLevel={cardLevel} key={commonCard.card_id1}/>
              );
            })}
        </div>
      </div>
    </div>
  );
}
