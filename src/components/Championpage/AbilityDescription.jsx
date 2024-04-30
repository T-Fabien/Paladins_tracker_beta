import React from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function AbilityDescription({ ability, img }) {
  return (
    <>
      <div className="champion__page__abilities__description__container">
        <img src={img} alt="" />
        <div className="champion__page__abilities__description__content">
          <h3>{ability.Summary}</h3>
          {ability.damageType === "AoE" && (
            <h4 className="champion__page__abilities__description__content__dmgtype">
              Dégâts de Zone
            </h4>
          )}
          {ability.damageType !== true &&
            ability.damageType !== false &&
            ability.damageType !== "AoE" && (
              <h4 className="champion__page__abilities__description__content__dmgtype">
                Dégâts {ability.damageType}
              </h4>
            )}
          <p className="champion__page__abilities__description__content__text">
            {ability.Description.replace(/<[^>]*>/g, '')}
          </p>
        </div>
      </div>
      {ability.rechargeSeconds !== 0 && (
        <div className="champion__page__abilities__description__cooldown">
          <FontAwesomeIcon icon={faClock} />
          <p>{ability.rechargeSeconds} s</p>
        </div>
      )}
    </>
  );
}