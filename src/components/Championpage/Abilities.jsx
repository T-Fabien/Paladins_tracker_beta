import React, { useState } from "react";
import AbilityDescription from "./AbilityDescription";

export default function Abilities({ champion }) {
  // State of the active spell text
  const [activeSpell, setActiveSpell] = useState(champion.Ability_1);
  // State of the active spell image
  const [activeSpellImg, setActiveSpellImg] = useState(
    champion.ChampionAbility1_URL
  );

  // Link the active spell to its description in order to display the spell and its description when you click on its key
  const linkAbilityToDescription = (e) => {
    const oldElement = document.getElementsByClassName("light_skills");
    oldElement[0].classList.remove("light_skills");

    const target = e.currentTarget;
    target.classList.add("light_skills");

    switch (target.id) {
      case "1":
        setActiveSpell(champion.Ability_1);
        setActiveSpellImg(champion.ChampionAbility1_URL);
        break;
      case "2":
        setActiveSpell(champion.Ability_2);
        setActiveSpellImg(champion.ChampionAbility2_URL);
        break;
      case "3":
        setActiveSpell(champion.Ability_3);
        setActiveSpellImg(champion.ChampionAbility3_URL);
        break;
      case "4":
        setActiveSpell(champion.Ability_4);
        setActiveSpellImg(champion.ChampionAbility4_URL);
        break;
      case "5":
        setActiveSpell(champion.Ability_5);
        setActiveSpellImg(champion.ChampionAbility5_URL);
        break;
      default:
        setActiveSpell(champion.Ability_6);
        setActiveSpellImg(champion.ChampionAbility6_URL);
    }
  };

  return (
    <section className="champion__page__abilities" id="Capacites">
        <a href="#Capacites">Capacités</a>
      <div>
        <div className="champion__page__abilities__items">
          {[1, 2, 3, 4, 5].map((abilityNumber) => {
            return (
              <button
              key={abilityNumber}
              onClick={linkAbilityToDescription}
              id={abilityNumber}
                className={`champion__page__abilities__button ${
                  abilityNumber === 1 ? "light_skills" : ""
                }`}
              >
                <div>
                  <img
                    src={champion[`ChampionAbility${abilityNumber}_URL`]}
                    alt=""
                  />
                  <p>
                  {["Clic Gauche", "Clic Droit", "A", "F", "E"][abilityNumber - 1]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="champion__page__abilities__description">
          <AbilityDescription ability={activeSpell} img={activeSpellImg} />
        </div>
      </div>
    </section>
  );
}