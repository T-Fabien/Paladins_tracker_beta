// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

// Class Icon
// import damageIcon from "@/app/assets/paladins_roles_icon/Class_Damage_Icon.png";
// import flankIcon from "@/app/assets/paladins_roles_icon/Class_Flank_Icon.png";
// import frontlineIcon from "@/app/assets/paladins_roles_icon/Class_Front_Line_Icon.png";
// import supportIcon from "/assets/paladins_roles_icon/Class_Support_Icon.png";

// File
import { champions_data } from "@/app/data/champions_data";

export default function HeroBanner({
  champion_name,
  champion_health,
  champion_lore,
  champion_roles,
}) {
  // Link the class of the champion to its icon
  var icon;
  var role;

  switch (champion_roles) {
    case "Paladins Dégâts":
      icon = "Class_Damage_Icon.png";
      role = "Dégâts";
      break;
    case "Paladins Flanc":
      icon = "Class_Flank_Icon.png";
      role = "Flanc";
      break;
    case "Paladins Tank":
      icon = "Class_Front_Line_Icon.png";
      role = "Tank";
      break;
    case "Paladins Soutien":
      icon = "Class_Support_Icon.png";
      role = "Soutien";
      break;
  }
  // Get the information (Difficulties) from the champion
  const data = champions_data.champions.filter((champions) => {
    return champions.name === champion_name;
  });

  // Difficulty rating system
  const maxRating = 5;

  let stars = new Array(maxRating);

  if (data.length > 0) {
    stars.fill("Star", 0, parseInt(data[0].difficulty));
    stars.fill("StarOutlineIcon", parseInt(data[0].difficulty));
  }

  return (
    <section className="champion__page__herobanner">
      <img
        className="champion__page__herobanner__background"
        src={"/assets/paladins_champ_background/" + champion_name + ".jpg"}
        alt=""
      />
      <div className="champion__page__herobanner__description">
        <h1>{champion_name.toUpperCase()}</h1>
        <p>{champion_lore.replace(/<[^>]*>/g, '')}</p>
        <div className="champion__page__herobanner__description__class">
          <img
          className="champion__page__herobanner__description__class__icon"
            src={`/assets/paladins_roles_icon/` + icon}
            alt=""
          />
          <p>{role}</p>
        </div>
        <p className="champion__page__herobanner__description__health">
          Point de Vie : {champion_health} HP
        </p>
        <p className="champion__page__herobanner__description__difficulty">
          Difficulté :
          {stars.map((starType, key) =>
            starType === "Star" ? (
              <FontAwesomeIcon
                icon={faStarSolid}
                key={key}
                style={{ color: "gold" }}
              />
            ) : (
              <FontAwesomeIcon icon={faStarRegular} key={key} />
            )
          )}
        </p>
      </div>
    </section>
  );
}