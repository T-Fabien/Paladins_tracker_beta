export default function CommonChampionCard({ card, cardLevel }) {
  const scaleCard = (cardDescription, cardLevel) => {
 // Delete the [Ability]
 if (cardDescription.includes("]")) {
  cardDescription = cardDescription.split("]")[1].substring(1);
}

// Find all {scale=value|defaultValue}
const regex = /{scale=(\d+(\.\d+)?)\|(\d+(\.\d+)?)}/g;
const matches = cardDescription.match(regex);

// If no scales found, return default description
if (!matches) {
  return cardDescription;
}

if (cardLevel > 5) {
  cardLevel = 5;
} else if (cardLevel < 1) {
  cardLevel = 1;
}

// Iterate through all matches and replace them with scaled values
matches.forEach((match) => {
  const parts = match.match(/\d+(\.\d+)?/g);
  const scaleValue = parseFloat(parts[0]);
  const defaultValue = parseFloat(parts[1]);

  // Calculate final value based on card level
  let finalValue = defaultValue + (cardLevel - 1) * scaleValue;

  // Check if the value needs formatting
  if (finalValue % 1 === 0) {
    finalValue = finalValue.toFixed(0);
  } else {
    finalValue = finalValue.toFixed(1);
  }

  // Replace the match with the scaled value
  cardDescription = cardDescription.replace(match, finalValue);
});

return cardDescription;
};

  return (
    <div className="cards__common__container">
      <img
        src={`https://webcdn.hirezstudios.com/paladins/cards/frame-${cardLevel}.png`}
        alt=""
        className="cards__common__container__frame"
      />
      <img src={card.championCard_URL} alt="" className="cards__common__container__img"/>
      <div className="cards__common__container__description">
        <p className="cards__common__container__description__title">{card.card_name} </p>
        <p className="cards__common__container__description__text">{scaleCard(card.card_description, cardLevel)} </p>
        <p className="cards__common__container__description__level">{cardLevel}</p>
      </div>
    </div>
  );
}
