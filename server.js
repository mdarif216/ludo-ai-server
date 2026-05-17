const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const themes = [
  "Fire",
  "Ice",
  "Galaxy",
  "Neon",
  "Royal"
];

const cosmetics = [
  "Golden Dice",
  "Neon Token",
  "Royal Crown",
  "Galaxy Trail",
  "Fire Aura"
];

function random(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

function generateShop() {

  const items = [];

  for(let i = 0; i < 6; i++) {

    items.push({
      item: random(cosmetics),
      rarity: random([
        "Common",
        "Rare",
        "Epic",
        "Legendary"
      ]),
      price:
        Math.floor(Math.random() * 1000) + 100
    });

  }

  return items;
}

function generateSeason() {

  const rewards = [];

  for(let i = 1; i <= 50; i++) {

    rewards.push({
      level: i,
      reward: random(cosmetics),
      coins:
        Math.floor(Math.random() * 500)
    });

  }

  return {
    seasonName:
      random(themes) + " Season",
    rewards
  };
}

app.get("/", (req, res) => {

  res.send("Ludo Legends Backend Running");

});

app.get("/shop", (req, res) => {

  res.json(generateShop());

});

app.get("/season", (req, res) => {

  res.json(generateSeason());

});

app.listen(PORT, () => {

  console.log(
    "Server running on port " + PORT
  );

});
